import { headers } from "../utils/headers";

export class API {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  // Create a new listing
  async createListing(listingData) {
    try {
      const response = await fetch(`${this.baseURL}/auction/listings`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(listingData),
      });

      if (!response.ok) {
        throw new Error("Failed to create listing");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating listing:", error);
    }
  }

  // Get 12 listings
  async getListings(limit = 12, page = 1, sortOrder = "desc") {
    const url = new URL(`${this.baseURL}/auction/listings`);
    url.searchParams.append("limit", limit);
    url.searchParams.append("page", page);
    url.searchParams.append("sortOrder", sortOrder);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: headers(),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch listings");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  }

  // Get a specific listing by ID
  async getListingById(id) {
    try {
      const response = await fetch(`${this.baseURL}/auction/listings/${id}`, {
        method: "GET",
        headers: headers(),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch listing");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching listing:", error);
    }
  }

  // Update an existing listing
  async updateListing(id, updatedData) {
    try {
      const response = await fetch(`${this.baseURL}/auction/listings/${id}`, {
        method: "PUT",
        headers: headers(),
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update listing");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating listing:", error);
    }
  }

  // Delete a listing by ID
  async deleteListing(id) {
    try {
      const response = await fetch(`${this.baseURL}/auction/listings/${id}`, {
        method: "DELETE",
        headers: headers(),
      });

      if (!response.ok) {
        throw new Error("Failed to delete listing");
      }

      return { message: "Listing deleted successfully" };
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  }
}
