<template>
  <v-container>
    <v-row class="text-center">
      <template>
        <v-card class="mt-4">
          <v-btn
            class="no-uppercase mt-4"
            color="orange darken-3"
            dark
            @click="openDialog()"
          >
            Add employee
          </v-btn>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
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
                <td class="text-right">
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
    </v-row>
    <DialogEmployee :dialog.sync="dialog" :flag.sync="flag" />
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
        flag: '',
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
      ...mapState(["allEmployees"]),
    },
    methods: {
    ...mapActions(["getAllEmployees"]),
    openDialog(){
      this.dialog = true;
      this.flag = "add";
      console.log(this.flag)
    },
    editEmployeeDetails(item: any){
      console.log(item, "edit item")
    },
    deleteEmployeeDetails(item: any){
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
