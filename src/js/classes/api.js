export class API {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  // Create a new listing
  async createListing(listingData) {
    try {
      const response = await fetch(`${this.baseURL}/auction/listings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(listingData),
      });

      if (!response.ok) {
        throw new Error("Failed to create listing");
      }

      const data = await response.json();
      return data; // Return created listing data
    } catch (error) {
      console.error("Error creating listing:", error);
      throw error;
    }
  }

  // Get all listings
  async getListings() {
    try {
      const response = await fetch(`${this.baseURL}/auction/listings`);
      if (!response.ok) {
        throw new Error("Failed to fetch listings");
      }

      const data = await response.json();
      return data; // Return the list of listings
    } catch (error) {
      console.error("Error fetching listings:", error);
      throw error;
    }
  }

  // Get a specific listing by ID
  async getListingById(id) {
    try {
      const response = await fetch(`${this.baseURL}/auction/listings/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch listing");
      }

      const data = await response.json();
      return data; // Return the listing details
    } catch (error) {
      console.error("Error fetching listing:", error);
      throw error;
    }
  }

  // Update an existing listing
  async updateListing(id, updatedData) {
    try {
      const response = await fetch(`${this.baseURL}/auction/listings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update listing");
      }

      const data = await response.json();
      return data; // Return the updated listing data
    } catch (error) {
      console.error("Error updating listing:", error);
      throw error;
    }
  }

  // Delete a listing by ID
  async deleteListing(id) {
    try {
      const response = await fetch(`${this.baseURL}/auction/listings/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete listing");
      }

      return { message: "Listing deleted successfully" }; // Return success message
    } catch (error) {
      console.error("Error deleting listing:", error);
      throw error;
    }
  }
}
