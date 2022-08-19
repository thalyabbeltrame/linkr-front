import Swal from 'sweetalert2';

export const alert = (type, title, text) => {
  return Swal.fire({
    icon: type,
    title: title,
    text: text,
  });
};
