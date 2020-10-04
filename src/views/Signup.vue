<template>
  <v-row justify="center">
    <v-col cols="4">
      <v-sheet min-height="70vh" rounded="lg" elevation="3" class="pa-10">
        <h1 style="font-weight: normal" class="mt-10">Sign up to continue</h1>
        <v-form ref="form" v-model="valid" @submit="submitHandler">
          <v-text-field
            label="Username"
            :rules="usernameRule"
            class="mt-2"
            v-model="username"
          >
          </v-text-field>
          <v-text-field
            label="Password"
            type="password"
            :rules="usernameRule"
            class="mt-2"
            v-model="password"
          ></v-text-field>
          <v-text-field
            label="EMail"
            v-model="email"
          ></v-text-field>
          <v-text-field
            label="Avatar URL"
            class="mt-2"
            v-model="avatar"
          ></v-text-field>
          <v-btn
            block
            color="primary"
            :disabled="!valid"
            @click="submitHandler"
            class="mt-2"
            >Submit</v-btn
          >
        </v-form>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable camelcase */
import userAPI from "../plugins/userapi.js";

export default {
  name: "Signzup",
  components: {},
  data: () => {
    return {
      valid: false,
      usernameRule: [
        (val) =>
          /^[a-zA-Z0-9]{6,}$/.test(val) ||
          "Only alphanumeric characters supported, minimum 6 characters required",
      ],
      username: "",
      password: "",
      email: "",
      avatar: ""
    };
  },
  methods: {
    submitHandler: async function() {
      if (this.$refs.form.validate()) {
        await userAPI.addUser(this.username, this.password, this.email, this.avatar)
      }
    },
  },
};
</script>
