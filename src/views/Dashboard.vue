<template>
  <div>
    <v-sheet min-height="70vh">
      <v-row class="pa-5">
        <template v-for="doc in documents">
          <v-col cols="3" sm="6" md="3" lg="3" :key="doc.created_by">
            <v-card
              min-height="7vh"
              elevation="2"
              class="ma-1 pa-5"
              rounded="lg"
              ripple
              @click="$router.push(`/dash/${doc.id.$oid}`)"
            >
              {{ doc.name }}
            </v-card>
          </v-col>
        </template>
        <v-col cols="3" sm="6" md="3" lg="3">
          <v-btn
            color="primary"
            min-height="7vh"
            text
            block
            @click="newDialog = !newDialog"
          >
            Add New
          </v-btn>
        </v-col>
      </v-row>
    </v-sheet>

     <v-dialog
      v-model="newDialog"
      persistent
      max-width="40vw"
    >
      <v-card>
        <v-card-title class="headline">
          Add New Document
        </v-card-title>
        <v-card-text class="mt-2">
          <v-spacer></v-spacer>          
                    <v-text-field
            label="Title"
            v-model="newDocument.name"
          ></v-text-field>
                    <v-text-field
            label="Content"
            v-model="newDocument.content"
          ></v-text-field>
          <v-spacer></v-spacer>          
        </v-card-text>
        <v-card-actions class="mt-2">
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="addNewDoc"
          >
            Add
          </v-btn>
          <v-btn
            color="red darken-1"
            text
            @click="newDialog = false"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import userAPI from "../plugins/userapi.js";

export default {
  name: "Dashboard",
  data: () => {
    return {
      newDialog: false,
      documents: [
        {
          name: "",
          id: { $oid: "" },
          created_by: "",
          content: "",
        },
      ],

      newDocument: {
        name: "",
        content: ""
      }
    };
  },

  methods: {
    async addNewDoc(){
      let doc = await userAPI.addNewDocument(this.newDocument.name, this.newDocument.content);
      this.newDialog = false;
      if(doc){
        alert("Added Successfully");
        this.updateState();
      } else {
        alert("Could not add")
      }
    },
    async updateState(){
      this.documents = await userAPI.getAllDocuments();
    }
  },
  created() {
    this.updateState()  
  },
};
</script>