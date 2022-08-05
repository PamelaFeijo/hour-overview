<template>
  <v-container>
      <template>
        <v-card class="mt-6">
          <div class="d-flex justify-space-between">
            <v-btn
              class="no-uppercase mt-4 ml-5"
              color="orange darken-3"
              dark
              @click="openDialog"
            >
            Add employee {{employee}}
            </v-btn>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                solo
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
          </div>
          <v-data-table
            :headers="headers"
            :items="allEmployees"
            :search="search"
          >
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.totalWeekHours }}</td>
                <td>{{ item.hoursWorked }}</td>
                <td>
                <v-menu>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="dark" icon v-bind="attrs" v-on="on">
                      <v-icon @click="editEmployeeDetails(item)">mdi-account-edit</v-icon>
                    </v-btn>
                    <v-btn color="dark" icon v-bind="attrs" v-on="on">
                      <v-icon @click="deleteEmployeeDetails(item)">mdi-delete</v-icon>
                    </v-btn>
                  </template>
                </v-menu>  
                </td>
              </tr>
            </template>
        </v-data-table>
        </v-card>
      </template>
    <DialogEmployee :dialog.sync="dialog" :flag.sync="flag" />

    <v-dialog v-model="deleteDialog" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Delete
        </v-card-title>

        <v-card-text class="mt-5">
          You are about to delete {{employee.name}} from system.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="orange darken-3"
            class="no-uppercase"
            text
          >
            Cancel
          </v-btn>
          <v-btn
            color="orange darken-3"
            class="no-uppercase"
            dark
          >
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapActions, mapState } from "vuex";
  import DialogEmployee from '../components/DialogEmployee.vue';

  export default Vue.extend({
    name: 'HourOverview',
    components: {
      DialogEmployee
    },
    data () {
      return {
        search: '',
        dialog: false,
        flag: 'add',
        deleteDialog: false,
        headers: [
          {
            text: 'Id',
            align: 'start',
            filterable: false,
            value: 'id',
          },
          { text: 'Name', value: 'name' },
          { text: 'Title', value: 'title' },
          { text: 'Total Week Hours', value: 'totalWeekHours' },
          { text: 'Hours Worked', value: 'hoursWorked' },
          { text: 'Actions', value: "data-table-expand", sortable: false }
        ],
      }
    },
    computed: {
      ...mapState(["allEmployees", "employee"]),
    },
    methods: {
    ...mapActions(["getAllEmployees"]),
    openDialog(){
      this.$store.commit("RESET_FORM");
      this.dialog = true;
      this.flag = "add";
    },
    editEmployeeDetails(item: any){
      this.dialog = true;
      this.flag = "edit";
      console.log(item, "edit item")
      this.$store.commit("SET_SELECTED_EMPLOYEE", item);
    },
    deleteEmployeeDetails(item: any){
      this.deleteDialog = true;
      this.$store.commit("SET_SELECTED_EMPLOYEE", item);
      console.log(item, "delete item")
    }
  },
   created() {
    this.getAllEmployees();
  }
  })
</script>

<style scoped>
.no-uppercase {
  text-transform: none;
}
</style>
