<script>
import callApi from "../utils/methods";

export default {
  // Declare an object that has the same properties as the back-end schema. Initialize values.
  data() {
    return {
      addProd: {
        name: "",
        code: "",
        weight: "",
        price: "",
        color: "",
      },

      // Declare a variable that will store the visible state of the form. Defaults to false.
      visible: false,
    };
  },

  methods: {
    // Function that emits the event to get the data once a new object is added.
    getData() {
      this.$emit("getData");
    },
    // Toggle the form's visibility.
    toggleVisible() {
      this.visible = !this.visible;
    },
    // onChange event for the inputs.
    onChange(event) {
      // Get the name of the input that is being changed.
      let target = event.target.name;

      // Update the value of the property with the name above.
      this.addProd[target] = event.target.value;
    },

    async onSubmit() {
      // Check to see if any object properties are empty (or if any input is empty).
      // Post the new product in the db.
      try {
        const newProd = await callApi("produse", "POST", this.addProd);
        // Call the function that emits the event when adding a new item inside the db.
        this.getData();
      } catch (error) {
        console.log(error.message);
      }
    },
  },
};
</script>

<template>
  <!-- Create a form with an input for each property needed. Each input will have a name similar to every property in addProd. This will help with 
     identifying which object property needs to be updated.

     When submitting the form, post the stored object in the db. -->
  <div>
    <button class="btn btn-success btn-lg" @click="toggleVisible">
      Add A Product
    </button>

    <form class="q-gutter-md" v-if="visible" @submit.prevent="onSubmit">
      <label for="Name">Name</label>
      <input
        @input="onChange"
        id="Name"
        placeholder="Name"
        name="name"
        type="text"
      />
      <label for="Code">Code</label>
      <input
        @input="onChange"
        id="Code"
        placeholder="Code"
        name="code"
        type="text"
      />
      <label for="Weight">Weight</label>
      <input
        @input="onChange"
        id="Weight"
        placeholder="Weight"
        name="weight"
        type="number"
        min="0"
      />
      <label for="Price">Price</label>
      <input
        @input="onChange"
        id="Price"
        placeholder="Price"
        name="price"
        type="number"
        min="0"
      />
      <label for="Color">Color</label>
      <input
        @input="onChange"
        id="Color"
        placeholder="Color"
        name="color"
        type="text"
      />
      <button class="btn btn-success">Add Product</button>
    </form>
  </div>
</template>

<style>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
form > input {
  width: 15rem;
  height: 2.5rem;
}
form > label {
  font-size: 16px;
}
</style>
