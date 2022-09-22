<template>
  <v-app dark >
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      class="no-print"
    >


 <v-list nav dense>
       <div v-for="(link, i) in links" :key="i">

        <v-list-item
            v-if="!link.subLinks"
            :to="link.to"
            :active-class="color"
            avatar
            class="v-list-item"
        >

            <v-list-item-icon>
                <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-title v-text="link.text" />
        </v-list-item>
<!--
   <v-list-group
            v-else
            :key="link.text"
            no-action
            :prepend-icon="link.icon"
            :value="false"
            :class="sub_menu"
        >
-->
        <v-list-group
            v-else
            :key="link.text"
            no-action
            :prepend-icon="link.icon"
            :value="false"

        >
            <template v-slot:activator>
              <v-list-item-title>{{ link.text }}</v-list-item-title>
             </template>

            <v-list-item
                v-for="sublink in link.subLinks"
                :to="sublink.to"
                :key="sublink.text"
            >
                <v-list-item-icon>
                  <v-icon>{{ sublink.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ sublink.text }}</v-list-item-title>

            </v-list-item>

        </v-list-group>

    </div>

      </v-list>

    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      flat
      dense
        class="no-print"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title v-text="title" />
      <v-spacer />
      <ThemeChanger/>
      <!-- <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <!-- <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <v-footer
      :absolute="!fixed"
      app
      class="no-print"
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import ThemeChanger from '../components/ThemeChanger.vue'
export default {
    data() {
        return {
            clipped: false,
            drawer: false,
            fixed: false,
            items: [
                {
                    icon: "mdi-apps",
                    title: "Welcome",
                    to: "/"
                },
                {
                    icon: "mdi-chart-bubble",
                    title: "Inspire",
                    to: "/inspire"
                }
            ],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: "ZENO",
            links: [
                {
                    to: "/",
                    icon: "mdi-view-dashboard",
                    text: "Dashboard",
                },
                // {
                //     icon: "mdi-home",
                //     text: "Task List",
                //     to: "/list"
                // },
                // {
                //     icon: "mdi-account-tie",
                //     text: "Agents",
                //     subLinks: [
                //         {
                //             text: "View Agents",
                //             to: "/agents",
                //             icon: "mdi-view-list"
                //         },
                //         {
                //             text: "Add New Agent",
                //             to: "/agents/add",
                //             icon: "mdi-plus"
                //         },
                //     ]
                // },
                {
                    icon: "mdi-account-key",
                    text: "Users",
                    to: "/users/",
                    // subLinks: [
                    //     {
                    //         text: "View All",
                    //         to: "/users/",
                    //         icon: "mdi-view-list"
                    //     },
                    //     {
                    //         text: "Add User",
                    //         to: "/users/add",
                    //         icon: "mdi-plus"
                    //     },
                    //     // {
                    //     //     text: "View System Monitor",
                    //     //     to: "settings/superuser/status",
                    //     //     icon: "mdi-bug"
                    //     // },
                    // ]
                },
                // {
                //     icon: "mdi-chart-bar",
                //     text: "Analytics",
                //     subLinks: [
                //         {
                //             text: "Task Analysis",
                //             to: "/analytics/task",
                //             icon: "mdi-view-list"
                //         },
                //         {
                //             text: "Real Time Analysis",
                //             to: "/apps",
                //             icon: "mdi-chart-multiple"
                //         },
                //         {
                //             text: "Perfomance",
                //             to: "/apps",
                //             icon: "mdi-chart-line-stacked"
                //         },
                //         {
                //             text: "Effeciency",
                //             to: "/apps",
                //             icon: "mdi-chart-pie"
                //         },
                //     ]
                // },
                // {
                //     icon: "mdi-file-chart",
                //     text: "Report",
                //     to: "/report"
                //     /*
                //     subLinks : [
                //         {
                //             text : 'View Applications',
                //             to    : '/apps',
                //             icon  : 'mdi-view-list'
                //         },
                //         {
                //             text : 'New Application',
                //             to    : '/apps',
                //             icon  : 'mdi-plus'
                //         },
                //     ]*/
                // },
                {
                    icon: "mdi-cogs",
                    text: "Settings",
                    subLinks: [
                        // {
                        //     text: "Profile",
                        //     to: "/settings/profile",
                        //     icon: "mdi-account"
                        // },
                        // {
                        //     text: "Prefrence",
                        //     to: "/settings/prefrence",
                        //     icon: "mdi-adjust"
                        // },
                        // {
                        //     text: "Manager",
                        //     to: "/settings/manager",
                        //     icon: "mdi-account-cog"
                        // },
                        // {
                        //     text: "Templates",
                        //     to: "/settings/templates",
                        //     icon: "mdi-buffer"
                        // },
                        {
                            text: "Agents",
                            to: "/settings/agents",
                            icon: "mdi-robot"
                        },
                        {
                            text: "MS Teams",
                            to: "/settings/ms_teams",
                            icon: "mdi-account-multiple"
                        },
                        // {
                        //     text: "Vehicle Types",
                        //     to: "/settings/vehicle",
                        //     icon: "mdi-car-connected"
                        // },
                        // {
                        //     text: "Notifications",
                        //     to: "/settings/notifications",
                        //     icon: "mdi-bell-ring"
                        // },
                        {
                            text: "SMS",
                            to: "/settings/sms",
                            icon: "mdi-message-processing"
                        },
                        {
                            text: "Email",
                            to: "/settings/email",
                            icon: "mdi-email-newsletter"
                        },
                        // {
                        //     text: "API",
                        //     to: "/settings/api",
                        //     icon: "mdi-api"
                        // },
                    ]
                },
                {
                    to: "/logout",
                    icon: "mdi-logout-variant",
                    text: "Logout",
                },
            ],
        };
    },
    components: { ThemeChanger }
}
</script>

<style>
@media print {
  .no-print {
    display: none;
  }
}


</style>
