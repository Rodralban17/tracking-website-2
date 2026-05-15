# users/serializers.py
from django.contrib.auth import get_user_model
from rest_framework import serializers
# from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import AuthenticationFailed
User = get_user_model()
class RegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all(),
        message="This username is already taken."
        )]
    )

    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all(),
        message="This email is already taken."
        )]
    )
    
    # A write-only field for password, so it's not included in read operations.
    password = serializers.CharField(
        write_only=True, required=True, style={'input_type': 'password'}
    )

    class Meta:
        model = User
        fields = ('id','username', 'email', 'is_active', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            is_active=validated_data.get('is_active', True)
        )
        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if not username:
            raise serializers.ValidationError(
                {"username": "This field is required."}
            )

        if '@' in username:
            try:
                user = User.objects.get(email=username)
            except User.DoesNotExist:
                pass # Let the default authentication handle invalid credentials
            else:
                attrs[self.username_field] = user.username
        
        
        try:
            data = super().validate(attrs)  
        except (AuthenticationFailed, serializers.ValidationError):
            raise serializers.ValidationError({
                "detail": "No active account found with the given credentials"
            })
        data.update({
            'id': self.user.id,
            'username': self.user.username,
            'email': self.user.email,
            'is_active': self.user.is_active,
        })
        return data

# This serializer is used to return selected user information to the frontend.
class UserInfoSerializer(serializers.ModelSerializer):
    # 1. ADD password field with write_only=True and required=False
    password = serializers.CharField(
        write_only=True, 
        required=False, # It's optional for updates
        style={'input_type': 'password'},
        allow_blank=True # Allows empty string from the frontend to pass validation
    )

    class Meta:
        model = User
        # 2. INCLUDE password in fields
        fields = ('id', 'username', 'email', 'is_active', 'password')
        # Make username and email optional for update, matching your front-end logic.
        extra_kwargs = {
            'username': {'required': False},
            'email': {'required': False},
        }

    # 3. OVERRIDE the update method to handle password hashing
    def update(self, instance, validated_data):
        # Handle password update separately
        password = validated_data.pop('password', None)
        
        # Check if a new, non-empty password was provided
        if password and password.strip():
            # Crucially, use set_password() to hash the password
            instance.set_password(password)
        
        # Update other fields (username, email, etc.)
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        
        # Save the instance
        instance.save()
        
        return instance
