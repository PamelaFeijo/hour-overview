<template>
  <v-container>
    <v-dialog  v-model="isDialogOpen" width="500">
    <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{flag === 'add' ? "Add Employee" : "Edit Employee" }}
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
            color="orange darken-3"
            class="no-uppercase"
            text
            @click="isDialogOpen = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="orange darken-3"
            class="no-uppercase"
            dark
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
  import { mapState } from "vuex";

  export default Vue.extend({
    name: 'DialogEmployee',
     props: {
      dialog: {
        type: Boolean,
        required: true
      },
      flag: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        search: '',
        items: ['Designer','Developer', 'Software Developer', 'Team Leader'],
      }
    },
    computed: {
      ...mapState(["employee"]),
      isDialogOpen: {
        get(): boolean {
            return this.dialog;
        },
        set(updatedBoolean): void {
            this.$emit("update:dialog", updatedBoolean);
        }
      },
    },
    methods: {
    addEmployee(){
      console.log( this.employee.name, this.employee.title, "state new values");
      // this.$store.commit("RESET_FORM");
      this.$store.dispatch("addEmployee", {
        name: this.employee.name,
        title: this.employee.title,
        totalWeekHours: this.employee.totalWeekHours,
        hoursWorked: this.employee.hoursWorked
      });
    }
   },
  })
</script>

<style>
.no-uppercase {
  text-transform: none;
}
</style>