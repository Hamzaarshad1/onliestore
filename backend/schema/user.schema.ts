import { object, string, ref } from "yup";

export const createUserSchema = object({
    body: object({
        name: string().required('name is required'),
        password: string()
        .required('Password is required')
        .min(6,'There should be min 6 charachters'),
        email: string()
        .email('must be a valid email')
        .required('email is required')
        
    }),
});

export const createUserSessionSchema = object({
    body: object({
      password: string()
        .required("Password is required")
        .min(6, "Password is too short - should be 6 chars minimum.")
        .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
  
      email: string()
        .email("Must be a valid email")
        .required("Email is required"),
    }),
  });
  