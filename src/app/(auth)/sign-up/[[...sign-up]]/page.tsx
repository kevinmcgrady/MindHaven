import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <SignUp
      appearance={{
        layout: {
          socialButtonsVariant: 'iconButton',
          logoImageUrl: '/images/blob.png',
        },
      }}
    />
  );
}
