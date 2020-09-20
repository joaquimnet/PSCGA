const $vm = new Vue({
  el: '#app',
  methods: {
    sendForm(e) {
      const formData = new FormData(e.target);
      console.log(e.target);
      console.log(formData);
      fetch('/survey', {
        method: 'POST',
        formData,
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
  },
});
