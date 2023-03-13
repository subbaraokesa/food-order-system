import {DashboardContact} from "../pages/dashboard/ContactDashboard";

export class DashboardService {
   static dashboardContacts = [
        {
            icon: "bi bi-person",
            name: "Colleague",
            color: "bg-info",
            count: 0
        },
        {
            icon: "bi bi-person-badge",
            name: "Friend",
            color: "bg-success",
            count: 0
        },
        {
            icon: "bi bi-alarm",
            name: "Family",
            color: "bg-warning",
            count: 0
        },
        {
            icon: "bi bi-calculator",
            name: "Service",
            color: "bg-danger",
            count: 0
        },
        {
            icon: "bi bi-device-hdd",
            name: "Community",
            color: "bg-primary",
            count: 0
        },
        {
            icon: "bi bi-emoji-angry",
            name: "Social",
            color: "bg-teal",
            count: 0
        }
    ];

    static getAllDashboardContacts() {
        return this.dashboardContacts;
    }
}