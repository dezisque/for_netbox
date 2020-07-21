export default function dataValidation(obj) {
  console.log(obj);
  let errors = [];
  if (!obj.name || /[a-zA-zа-яА-Я]/.test(obj.name) === false) {
    errors.push("Enter correct name");
  }
  if (/\d/.test(obj.phone) === false) {
    errors.push("Enter correct phone");
  }
  if (!+obj.age || +obj.age <= 0 || +obj.age > 120) {
    errors.push("Enter correct age");
  }
  if (/^\S+@\S+\.\S+$/.test(obj["e-mail"]) === false) {
    errors.push("Enter correct email");
  }
  return errors;
}
