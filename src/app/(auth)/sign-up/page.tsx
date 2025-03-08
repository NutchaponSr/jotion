import { SignUpForm } from "@/modules/auth/components/form-sign-up";
import { AuthWrapper } from "@/modules/auth/components/auth-wrapper";

const SignInPage = () => {
  return (
    <AuthWrapper title="Sign Up" description="Create your account">
      <SignUpForm />
    </AuthWrapper>
  );
}

export default SignInPage;