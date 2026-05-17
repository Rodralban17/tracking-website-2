import apiRequest from "./apiRequest";
import { redirect } from "react-router-dom";
import { ACCESS_TOKEN } from "./constants"; 

export function authGuardLoader() {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
        throw redirect("/login");
    }
    return null;
}
export const dashboardLoader = async ({ request, params }) => {
  // Use Promise.all to fetch multiple data concurrently
  try{
        const [allShipments,] = await Promise.all([
        apiRequest.get("/shipments/"),
        // apiRequest.get("/categories/"), 
        // apiRequest.get("/products/") 
      ]);

      // Return the data from all responses
      return {
        shipments: allShipments.data,
        // categories: allCategories.data,
        // products: allProducts.data
      };
  }catch(error){
        if (error.response?.status === 401 || error.response?.status === 400) {
            console.error("Token refresh failed. Forcing logout and redirect.");
            throw redirect("/login"); 
        }
        throw error;
  }
};