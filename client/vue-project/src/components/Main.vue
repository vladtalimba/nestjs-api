<script>
import callApi from "../utils/methods";
import AddProd from "./AddProd.vue";
import EditProd from "./EditProd.vue";

let splitSize = 3;

export default {
  // Import and declare the components that deal with adding and edditing an element in the db.
  components: {
    AddProd,
    EditProd,
  },

  // Create a variable that will store all the elements in the db after the GET request. Initialize it as an empty array.
  data() {
    return {
      produse: [],
      toEdit: {},
      index: 0,
      pageProd: [],
    };
  },

  // Fetch api data when first starting the application.
  created() {
    this.fetchData();
  },

  // Watch for any changes in the data. Change the elements of the original array every time a change occurs.
  watch: {
    produse(newProduse) {
      this.produse = newProduse;
    },
  },

  methods: {
    // Function that splits the original array with the data into smaller chunks. Each chunk will represent the content displayed inside one page in the table.
    splitArray(arr, chunkSize) {
      const subArr = [];
      for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        subArr.push(chunk);
      }
      return subArr;
    },

    // Function that decrements the index, allowing the user to go back to elements in a previous table page.
    prevPage() {
      // Check to see if index dropped below 0. If it is true, cap the minimum value to 0.
      if (this.index <= 0) {
        this.index = 0;
      } else {
        this.index--;
      }
    },

    // Function that increments the index, allowing the user to go to elements in a following table page.
    nextPage() {
      // Check to see if index increased above the length of the split array. If it is true, cap the maximum value to the length of the array - 1.
      if (this.index >= this.pageProd.length - 1) {
        this.index = this.pageProd.length - 1;
      } else {
        this.index++;
      }
    },
    // Function that sorts the elements in the table by their lowest price.
    sortByPriceDsc() {
      this.produse.sort((a, b) => b.price - a.price);

      // After sorting the original array, set the split array using the sorted original.
      this.pageProd = this.splitArray(this.produse, splitSize);
    },
    // Function that sorts the elements in the table by their lowest price.
    sortByPriceAsc() {
      this.produse.sort((a, b) => a.price - b.price);
      // After sorting the original array, set the split array using the sorted original.
      this.pageProd = this.splitArray(this.produse, splitSize);
    },
    // Function that sorts the elements in the table by their name.
    sortByName() {
      this.produse.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });

      // After sorting the original array, set the split array using the sorted original.
      this.pageProd = this.splitArray(this.produse, splitSize);
    },

    // Function to get the api data. Uses a separate method created that works with any endpoint and request. Store data inside "produse".
    async fetchData() {
      try {
        const res = await callApi("produse", "GET");
        const data = await res.json();
        // Store the data inside an array.
        this.produse = data;
        // Split the data into sub arrays, each representing a page from the table.
        this.pageProd = this.splitArray(this.produse, splitSize);
      } catch (error) {
        console.log(error);
      }
    },

    // Function to delete a produs.
    async deleteProd(produs) {
      try {
        const deleted = await callApi(`produse/${produs._id}`, "DELETE");
        this.fetchData();
      } catch (error) {
        console.log(error);
      }
    },

    // Function to edit a produs.
    editProd(produs) {
      this.toEdit = produs;
    },
  },
};
</script>

<template>
  <!-- Create a table that will display the api data. There will be a row rendered for each element inside the db, as well as two buttons: 
       Delete for deleting an element, and Edit to change an element if needed.

       This page also renders the AddProd form and the EditProd form.-->
  <div>
    <table class="table table-hover table-dark">
      <thead>
        <tr>
          <th>Name</th>
          <th>Code</th>
          <th>Weight</th>
          <th>Price</th>
          <th>Color</th>
          <th>Edit Item</th>
          <th>Delete Item</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="produs in pageProd[this.index]" :key="produs.id">
          <td>{{ produs.name }}</td>
          <td>{{ produs.code }}</td>
          <td>{{ produs.weight }}</td>
          <td>{{ produs.price }}</td>
          <td>{{ produs.color }}</td>
          <td>
            <button class="btn btn-warning" @click="() => editProd(produs)">
              Edit
            </button>
          </td>
          <td>
            <button class="btn btn-danger" @click="() => deleteProd(produs)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="page-controls">
      <button class="btn btn-info" @click="prevPage()">Previous Page</button>
      <span>Page {{ index + 1 }} of {{ this.pageProd.length }}</span>
      <button class="btn btn-info" @click="nextPage()">Next Page</button>
    </div>
    <div class="dropdown">
      <button class="dropbtn btn btn-primary btn-lg">Sort By</button>
      <div class="dropdown-content">
        <button class="btn btn-secondary" @click="sortByName()">Name</button>
        <button class="btn btn-secondary" @click="sortByPriceAsc()">
          Lowest Price
        </button>
        <button class="btn btn-secondary" @click="sortByPriceDsc()">
          Highest Price
        </button>
      </div>
    </div>
    <div class="form-container">
      <AddProd @getData="this.fetchData" />
      <EditProd :prodToEdit="this.toEdit" @getData="this.fetchData" />
    </div>
  </div>
</template>

<style>
table {
  font-size: 18px;
}
/* Placing of image control buttons. */
.page-controls {
  display: flex;
  justify-content: center;
  align-items: center;
}

.page-controls > button {
  margin-left: 10px;
  margin-right: 10px;
  font-size: 18px;
}
.page-controls > span {
  font-size: 18px;
}
/* Dropdown Button */
.dropbtn {
  margin-left: 4rem;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {
  background-color: #ddd;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

/* Display style for the form container. */
.form-container {
  display: flex;
  justify-content: space-between;
  margin-left: 20rem;
  margin-right: 20rem;
}
</style>
