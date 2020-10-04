<template>
  <div>
    <v-row justify="center">
      <v-col sm="12" md="8">
        <v-sheet min-height="70vh" rounded="lg" class="pa-10" elevation="5">
          <h1 class="mb-5" style="font-weight: normal">{{ document.name }}</h1>
          <p>
            {{ document.content }}
          </p>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import userAPI from "../plugins/userapi.js";

export default {
  name: "Dashboard",
  data: () => {
    return {
      userInfo: {
        id: {
          $oid: "",
        },
        username: "",
        email: "",
        avatar: "https://i.pravatar.cc/300",
      },
      document: {
        name: "Loading...",
        id: { $oid: "" },
        created_by: "",
        content: "Loading...",
      },
      wsInst: null,
    };
  },
  methods: {
    async loader() {
      this.document = await userAPI.getDocumentById(this.$route.params.did);
    },
    async userFetch() {
      this.userInfo = await userAPI.whoami();
    },
    connOpen(ev) {
      console.log("WS CONN OPEN", ev);
      this.wsInst.send(
        JSON.stringify({
          userInfo: this.userInfo,
          did: this.document.id,
          type: "INIT",
        })
      );
    },

    connClose(ev) {
      console.log("WS CONN CLOSE", ev);
    },

    connMsg(ev) {
      console.log("WS CONN msg", ev);
      let data = JSON.parse(ev.data);
      if (data.type == "USER_LIST") {
        console.log(data.userList);
        this.$emit("userList", data.userList);
      }
    },

    connErr(ev) {
      console.log("WS CONN err", ev);
    },
  },
  watch: {},
  async beforeRouteLeave(to, from, next) {
    // called when the route that renders this component is about to
    // be navigated away from.
    // has access to `this` component instance.
    // alert("ASDASD")
    if (this.wsInst) {
      this.wsInst.send(
        JSON.stringify({
          type: "CLOSE",
          did: this.document.id,
          userInfo: this.userInfo,
        })
      );
      this.$emit("userList", []);
      // this.wsInst.onclose = function(ev){
      //   next();
      // }
    }
    next();
  },

  async created() {
    await this.loader();
    await this.userFetch();
    this.wsInst = new WebSocket(process.env.VUE_APP_WS);
    this.wsInst.onopen = this.connOpen;
    this.wsInst.onclose = this.connClose;
    this.wsInst.onmessage = this.connMsg;
    this.wsInst.onerror = this.connErr;

    selfIns = this;
    window.addEventListener("beforeUnload", confirmExit);
    function confirmExit() {
      return "You have attempted to leave this page. Are you sure?";
    }

    window.onunload = function () {
      if (selfIns.wsInst) {
        selfIns.wsInst.send(
          JSON.stringify({
            type: "CLOSE",
            did: selfIns.document.id,
            userInfo: selfIns.userInfo,
          })
        );
      }
    };
  },
};
</script>