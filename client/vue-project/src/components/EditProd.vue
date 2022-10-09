<script>
import callApi from "../utils/methods";

export default {
  // Props from the Main component. This contains the information about the element that needs to be edited.
  props: {
    prodToEdit: { type: Object },
  },
  // Declare an object that will store the attributes from props.
  data() {
    return {
      editedProd: {},

      // Declare a variable that will store the visible state of the form. Defaults to false.
      visible: false,
    };
  },

  // Watch for a change in the props. Everytime they change, set editedProd to the new object stored in props.
  watch: {
    prodToEdit() {
      this.editedProd = this.prodToEdit;
    },
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
      this.editedProd[target] = event.target.value;
    },

    async onSubmit() {
      // Check to see if the object to edit is empty (or that any props have been received or that the form is empty).
      if (JSON.stringify(this.editedProd) === "{}") {
        // Alert the message.
        alert("Please select an item to edit.");
      } else {
        // Update the product in the db.
        try {
          const newProd = await callApi(
            `produse/${this.editedProd._id}`,
            "PUT",
            this.editedProd
          );
          this.getData();
        } catch (error) {
          console.log(error.message);
        }
      }
    },
  },
};
</script>

<template>
  <!-- Created a form that will display the text values of the props that it receives as soon as an element is chosen for edit.
  
       The user can modify any input they wish or even keep them the same without problems.  -->
  <div>
    <button class="btn btn-warning btn-lg" @click="toggleVisible">
      Edit A Product
    </button>

    <form v-if="visible" @submit.prevent="onSubmit">
      <label for="Name">Name</label>
      <input
        @input="onChange"
        id="Name"
        placeholder="Name"
        name="name"
        type="text"
        v-model="this.editedProd.name"
      />
      <label for="Code">Code</label>
      <input
        @input="onChange"
        id="Code"
        placeholder="Code"
        name="code"
        type="text"
        v-model="this.editedProd.code"
      />
      <label for="Weight">Weight</label>
      <input
        @input="onChange"
        id="Weight"
        placeholder="Weight"
        name="weight"
        type="number"
        min="0"
        v-model="this.editedProd.weight"
      />
      <label for="Price">Price</label>
      <input
        @input="onChange"
        id="Price"
        placeholder="Price"
        name="price"
        type="number"
        min="0"
        v-model="this.editedProd.price"
      />
      <label for="Color">Color</label>
      <input
        @input="onChange"
        id="Color"
        placeholder="Color"
        name="color"
        type="text"
        v-model="this.editedProd.color"
      />
      <button class="btn btn-warning">Edit Product</button>
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
