import { loadListings } from "../ui/home.js";

export function displayListings(data) {
  const wrapper = document.getElementById("contentWrapper");
  const ul = document.createElement("ul");
  wrapper.innerHTML = "";
  ul.className = "grid grid-cols-4 gap-4 mb-5";
  ul.setAttribute("id", "listingContainer");

  data.forEach((listing) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    const img = document.createElement("img");
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    // const p1 = document.createElement('p'); no seller name provided by api.
    const p2 = document.createElement("p");

    li.classList.add(
      "bg-white",
      "rounded-lg",
      "shadow-md",
      "hover:shadow-lg",
      "transition-all",
      "duration-300"
    );
    li.setAttribute("id", listing.id);

    img.classList.add("w-full", "h-48", "object-cover", "rounded-t-lg");
    div.classList.add("p-4");
    h3.classList.add("font-semibold", "text-xl");
    p2.classList.add("text-gray-500", "text-sm");

    h3.textContent = listing.title;
    if (!listing.media || listing.media.length === 0 || !listing.media[0]) {
      img.src = "https://via.placeholder.com/300x200";
      img.alt = "placeholder image";
    } else {
      img.src = listing.media[0].url;
      img.alt = listing.media[0].alt;
    }
    p2.textContent = `Deadline: ${listing.endsAt}`;
    a.href = `/listing/index.html?id=${listing.id}`;

    div.append(h3, p2);
    a.append(img, div);
    li.appendChild(a);
    ul.appendChild(li);
    wrapper.appendChild(ul);
  });
}

export function pagination(meta) {
  const wrapper = document.getElementById("contentWrapper");
  const paginationContainer = document.createElement("div");
  paginationContainer.className =
    "flex items-center justify-center space-x-4 mt-8";

  // Previous button
  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.className =
    "pagination-button py-2 px-4 rounded-md text-white bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-300";
  prevButton.disabled = meta.isFirstPage;
  prevButton.onclick = () => {
    if (!meta.isLastPage) {
      (async () => {
        await loadListings(meta.previousPage);
      })();
    }
  };

  // Next button
  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.className =
    "pagination-button py-2 px-4 rounded-md text-white bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-300";
  nextButton.disabled = meta.isLastPage;
  nextButton.onclick = () => {
    if (!meta.isLastPage) {
      (async () => {
        await loadListings(meta.nextPage);
      })();
    }
  };

  // Page info
  const pageInfo = document.createElement("div");
  pageInfo.className = "text-gray-600";
  pageInfo.textContent = `Page ${meta.currentPage} of ${meta.pageCount}`;

  // Append buttons and page info to pagination container
  paginationContainer.style.marginTop = "50px";
  paginationContainer.appendChild(prevButton);
  paginationContainer.appendChild(pageInfo);
  paginationContainer.appendChild(nextButton);
  wrapper.appendChild(paginationContainer);
}

export function displaySingleListing(listing) {
  const title = document.getElementById("listingTitle");
  const desc = document.getElementById("listingDesc");
  const deadline = document.getElementById("listingDeadline");
  const showBids = document.getElementById("show-bids");
  const maxBid = document.getElementById("listingMaxBid");
  const owner = document.getElementById("listingOwner");
  const carousel = document.getElementById("gallery-slider");

  title.textContent = listing.title;
  desc.textContent = listing.description;
  deadline.textContent = `Deadline: ${listing.endsAt}`;
  showBids.textContent = Array.isArray(listing.bids) ? listing.bids.length : 0;
  maxBid.textContent = `Current max bid: ${
    listing.bids?.length
      ? `${Math.max(...listing.bids.map((bid) => bid.amount))} USD`
      : "Not available"
  }`;

  // check if seller exists, if yes display, otherwise disable the link
  if (listing.seller) {
    owner.textContent = `Seller: ${listing.seller.name}`;
  } else {
    owner.textContent = "Seller: Not available";
    owner.href = "#";
    owner.style.textDecoration = "none";
  }

  //create as many slides as media of the listing
  listing.media.forEach((obj) => {
    const img = document.createElement("img");
    img.className = "slide w-full flex-shrink-0";
    img.src = obj.url;
    img.alt = obj.alt;
    // append to carousel container
    carousel.appendChild(img);
  });
}
