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
          ></v-data-table>
        </v-card>
      </template>
    </v-row>
    <Dialog :dialog.sync="dialog" />
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapActions, mapState } from "vuex";
  import Dialog from '../components/DialogEmployee.vue';

  export default Vue.extend({
    name: 'HourOverview',
    components: {
      Dialog
    },
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
      }
    },
    computed: {
      ...mapState(["allEmployees"]),
    },
    methods: {
    ...mapActions(["getAllEmployees"]),
    openDialog(){
      this.dialog = true;
    },
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
