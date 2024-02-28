import "../index.css";
import { useState } from "react";
//Shadcn imports//
import cn from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { useToast } from "@/components/ui/use-toast"; // You should remove that to the root layout if you want to access toast all over the project
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import { fromZodError } from 'zod-validation-error';
import { useForm } from "react-hook-form";
import { registerSchema } from "@/validators/auth";
import { ArrowRight } from "lucide-react";
type Input = z.infer<typeof registerSchema>;

export const FormTest = () => {
  // const { toast } = useToast();
  const form = useForm<Input>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  function onSubmit(data: Input) {
    if (data.confirmPassword !== data.password) {
      // toast({
      //   title: "Passwords do not match",
      //   variant: "destructive",
      // });
      return;
    }
    alert(JSON.stringify(data, null, 4));
    console.log(data);
  }
  return (
    <>
      <div className="">
        <Card className="w-[24em] border-2 mx-auto rounded-lg absolute top-1/2 right-1/2 translate-x-[50%] translate-y-[-50%]">
          <CardHeader className="text-3xl  font-semibold text-gray-800">
            Create your account
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="relative space-y-3 overflow-x-hidden"
              >
                <div className={cn("min-w-full space-y-2")}>
                  {/* name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="">Full name</FormLabel>
                        <FormControl className="">
                          <Input placeholder="Enter your name..." {...field} />
                        </FormControl>
                        <FormMessage className="mt-" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="">Email</FormLabel>
                        <FormControl className="">
                          <Input placeholder="Enter your email..." {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="">Password</FormLabel>
                        <FormControl className="">
                          <Input
                            placeholder="Enter your password..."
                            {...field}
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="">Confirm password</FormLabel>
                        <FormControl className="">
                          <Input
                            placeholder="Please confirm your password..."
                            {...field}
                            type="password"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="button"
                  variant="default"
                  onClick={() => {
                    form.trigger([
                      "name",
                      "email",
                      "password",
                      "confirmPassword",
                    ]);
                    const { name, email } = registerSchema.shape;
                    const validName = name.safeParse(
                      form.getValues("name"),
                    ).success;
                    const validEmail = email.safeParse(
                      form.getValues("email"),
                    ).success;
                    console.log(validName, validEmail);
                    // !validEmail || !validName ? "" : setFormStep(1);
                  }}
                >
                  Submit
                </Button>

                <p className="mt-4 ms-2 text-gray-600 text-sm">
                  Already have an account?{" "}
                  <a className="text-blue-500" href="/login">
                    Login
                  </a>
                </p>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
