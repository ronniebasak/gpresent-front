<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-container class="py-0 fill-height">
        <v-avatar class="mr-10 white--text" color="grey darken-1" size="32">SG</v-avatar>

        <template v-if="showLinks">
          <v-btn
            v-for="link in links"
            :key="link.name"
            text
            @click="$router.push({ name: link.name })"
          >
            {{ link.title }}
          </v-btn>
        </template>
        <template v-else>
          <v-btn text @click="$router.push({name: 'dash'})">Dashboard</v-btn>
          <v-btn text @click="logout" > Logout </v-btn>
        </template>

        <v-spacer></v-spacer>

        <v-responsive max-width="300" v-if="showUserList">
          <v-avatar size="32" v-for="user in userList" :key="`qw_${user.id.$oid}`" color="grey darken-2" class="white--text">
            <img :src="user.avatar"></img>
          </v-avatar>
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <!-- <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list color="transparent">
                <v-list-item
                  v-for="n in 5"
                  :key="n"
                  link
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      List Item {{ n }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item
                  link
                  color="grey lighten-4"
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      Refresh
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col> -->

          <v-col>
            <router-view @login="login" @userList="updateUserList"></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    links: [
      { title: "Login", name: "login" },
      { title: "Register", name: "signup" },
    ],
    userList: [
      {
        username: "",
        avatar: ""
      }
    ],
    showUserList: false,
    showLinks: true,
  }),
  methods: {
    logout() {
      delete window.appGlobals.token;
      sessionStorage.clear();
      this.$router.push({ name: "login" });
      this.showLinks = true;
      this.$forceUpdate();
    },
    login() {
      this.showLinks = false;
      this.$router.push({ name: "dash" });
    },

    updateUserList(data){
      if(data.length){
        this.showUserList = true
        this.userList = data;
      } else {
        this.showUserList = false
        this.userList = data;
      }
    }
  },
  created() {
    if (window.appGlobals.token || sessionStorage.getItem("token")) {
      console.log("SESSION FOUND");
      this.showLinks = false;
    } else {
      this.$router.push({ name: "login" });
    }
  },
};
</script>
