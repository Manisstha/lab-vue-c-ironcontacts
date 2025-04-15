import { defineStore } from "pinia"
import { ref } from "vue"
import contact from "../contacts.json"

export const useContactsStore = defineStore("contacts", () => {
    const firstFiveContacts = ref(contact.slice(0, 5));

    const hasWonOscar = (contact) => contact.wonOscar === true;
    const hasWonEmmy = (contact) => contact.wonEmmy === true;


    const addRandomContact = () => {
        const randomIndex = Math.floor(Math.random() * contact.length)
        const randomContact = contact[randomIndex]
        firstFiveContacts.value = [...firstFiveContacts.value, randomContact];
    }

    const sortByPopularity = ref(true);
    const sortByName = ref(true);
    const toggleSortByPopularity = () => {
        firstFiveContacts.value.sort((a, b) => {
            return sortByPopularity.value
                ? a.popularity - b.popularity
                : b.popularity - a.popularity;
        });
        sortByPopularity.value = !sortByPopularity.value;
    };
    const toggleSortByName = () => {
        firstFiveContacts.value.sort((a, b) => {
            return sortByName.value
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
        });
        sortByName.value = !sortByName.value;
    };

    const deleteContact = (id) => {
        firstFiveContacts.value = firstFiveContacts.value.filter(
            (contact) => contact.id !== id
        );
    };

    return {
        firstFiveContacts,
        hasWonOscar,
        hasWonEmmy,
        addRandomContact,
        toggleSortByPopularity,
        toggleSortByName,
        deleteContact,
    };

})
