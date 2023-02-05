import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure,
} from "vee-validate";
import {
  required,
  max,
  min,
  alpha as alpha,
  alpha_num as alpha_num,
  alpha_spaces as alphaSpaces,
  email,
  digits,
  numeric,
  max_value as maxVal,
  min_value as minVal,
  confirmed,
  not_one_of as excluded,
  regex,
  one_of,
} from "@vee-validate/rules";

export default {
  install(app) {
    app.component("VeeForm", VeeForm);
    app.component("VeeField", VeeField);
    app.component("ErrorMessage", ErrorMessage);

    defineRule("required", required);
    defineRule("tos", required);
    defineRule("max", max);
    defineRule("min", min);
    defineRule("alpha", alpha);
    defineRule("alpha_spaces", alphaSpaces);
    defineRule("alpha_num", alpha_num);
    defineRule("email", email);
    defineRule("digits", digits);
    defineRule("numeric", numeric);
    defineRule("max_value", minVal);
    defineRule("min_value", maxVal);
    defineRule("confirmed", confirmed);
    defineRule("excluded", excluded);
    defineRule("excluded_country", excluded);
    defineRule("regex", regex);
    defineRule("one_of", one_of);

    configure({
      generateMessage(ctx) {
        const messages = {
          required: `حقل مطلوب`,
          max: `الحقل طوبل جدا`,
          min: `الحقل قصير  جدا`,
          alpha: `الحقل يجب ان يتكون من حروف ابجدية فقط`,
          alpha_spaces: `الحقل يجب ان يتكون من حروف ومسافات فقط`,
          alpha_num: `يجب ان تتكون من حروف وارقام`,
          email: `بريد الكتروني غير صحيح`,
          digits: `الحقل يجب ان يتكون من ارقام فقط`,
          numeric: `الحقل يجب ان يتكون من ارقام فقط`,
          max_value: `قيمة الحقل عالية جدا`,
          min_value: `قيمة الحقل قليلة جدا`,
          excluded: "هذا الحقل غير مسموح به",
          excluded_country: "we don't accept users from this location",
          confirmed: "كلمات المرور  لا تتطابق",
          tos: "يجب ان توافق عل شروط الاستخدام",
          one_of: "هذا الاختيار غير موجود",
        };
        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `the ${ctx.field} field is not valid`;
        return message;
      },
      validateOnBlur: false,
      validateOnChange: false,
      validateOnInput: false,
      validateOnModelUpdate: false,
    });
  },
};
