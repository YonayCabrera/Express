<template>
  <ul v-if="posts && posts.length">
      <li v-for="post of posts">
        <p><strong>{{post.name}}</strong></p>
        <p>{{post.username}}</p>
      </li>
    </ul>
</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
      posts: [],
      errors: []
    }
  },
  created() {
    axios.get(`http://localhost:5000/users`)
    .then(response => {
      console.log(response)
      this.posts = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })

  },
  name: 'App'
}
</script>