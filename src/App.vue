<script setup>
import contacts from "./contacts.json";
import { ref } from "vue";

const firstFiveContacts = ref(contacts.slice(0, 5));
const hasWonOscar = (contact) => {
  return contact.wonOscar ? true : false;
};
const hasWonEmmy = (contact) => {
  return contact.wonEmmy ? true : false;
};

const addRandomContact = () => {
  const randomIndex = Math.floor(Math.random() * contacts.length);
  const randomContact = contacts[randomIndex];
  firstFiveContacts.value = [...firstFiveContacts.value, randomContact];
};

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
</script>

<template>
  <div class="main-container">
    <h1>IronContacts</h1>
    <div class="button-container">
      <button @click="addRandomContact">Add Random Contact</button>
      <button @click="toggleSortByPopularity">Sort by popularity</button>
      <button @click="toggleSortByName">Sort by name</button>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="contact in firstFiveContacts" :key="contact.id">
            <td>
              <img
                :src="contact.pictureUrl"
                :alt="contact.name"
                class="contact-image"
              />
            </td>
            <td>{{ contact.name }}</td>
            <td>{{ contact.popularity }}</td>
            <td>{{ hasWonOscar(contact) ? "🏆" : "" }}</td>
            <td>{{ hasWonEmmy(contact) ? "🏆" : "" }}</td>
            <td>
              <button @click="() => deleteContact(contact.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>



<style>
.main-container {
  width: 80%;
  margin: auto;
  text-align: center;
}
.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
.contact-image {
  width: 100px;
  height: auto;
  object-fit: contain;
}
table {
  width: 100%;
  table-layout: fixed;
}

th,
td {
  padding: 8px;
  text-align: center;
}

</style>