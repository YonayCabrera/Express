<template>
<div>
<v-form>
    <v-text-field
      label="Name"
      v-model="name"
      :counter="10"
      required
    ></v-text-field>
    <v-text-field
      label="UserName"
      v-model="userName"
      required
    ></v-text-field>
    <v-text-field
      label="E-mail"
      v-model="email"
      required
    ></v-text-field>
  </v-form>
    <v-btn large v-on:click.native="register" color="primary">
        Register
    </v-btn>
    <router-link to="/users" tag="span" style="cursor: pointer">
    <v-btn large color="primary">
        Usuarios
    </v-btn>
    </router-link>
</div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      userName: "",
      email: "",
      errors: []
    };
  },
  methods: {
    register: function(event) {
      console.log("entra");
      var user = {
        name: this.name,
        username: this.userName,
        email: this.email,
        tweets: []
      };
      axios
        .post(`http://localhost:5000/users`, user)
        .then(response => {
          console.log(response);
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  }
};
</script>
