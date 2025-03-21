import { SignInForm } from "@/modules/routes/auth/components/form-sign-in";
import { AuthWrapper } from "@/modules/routes/auth/components/auth-wrapper";

const SignInPage = () => {
  return (
    <AuthWrapper title="Sign In" description="Connect with your account">
      <SignInForm />
    </AuthWrapper>
  );
}

export default SignInPage;