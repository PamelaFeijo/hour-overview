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
            :items="countries"
            :search="search"
          ></v-data-table>
        </v-card>
      </template>
    </v-row>

    <v-dialog  v-model="dialog" width="500">
    <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Add Employee {{employee}}
        </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
        <v-card-text>
          Name
          <v-text-field
            placeholder="John"
            v-model="employee.name"
            solo
          ></v-text-field>
          Title
           <v-select
          :items="items"
          v-model="employee.title"
          label="Designer"
          solo
        ></v-select>
        Total Week Hours
        <v-text-field
          v-model.number="employee.totalWeekHours"
          type="number"
          solo
          dense
        >
        </v-text-field>
        Hours Worked
        <v-text-field
          v-model.number="employee.hoursWorked"
          type="number"
          solo
          dense
        >
        </v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="addEmployee()"
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

  export default Vue.extend({
    name: 'HourOverview',
    
    data () {
      return {
        search: '',
        dialog: false,
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
          { text: "", value: "data-table-expand", sortable: false }
        ],
        items: ['Designer','Developer', 'Software Developer', 'Team Leader'],
      }
    },
    computed: {
      ...mapState(["countries", "employee"]),
    },
    methods: {
    ...mapActions(["getAllCountries"]),
    openDialog(){
      console.log('clicked');
      this.dialog = true;

    },
    addEmployee(){
      console.log( this.employee.name, this.employee.title, "state new values");
      this.dialog = true;
      // this.$store.commit("RESET_FORM");
      this.$store.dispatch("addEmployee", {
        name: this.employee.name,
        title: this.employee.title,
        totalWeekHours: this.employee.totalWeekHours,
        hoursWorked: this.employee.hoursWorked
      });
    }
  },
   created() {
    this.getAllCountries();
  }
  })
</script>

<style scoped>
.no-uppercase {
  text-transform: none;
}
</style>
