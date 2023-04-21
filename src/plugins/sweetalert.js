import Swal from 'sweetalert2'

const SweetAlert = {
  install(Vue) {
    Vue.prototype.$swal = Swal;
  }
};

export default SweetAlert;
