import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <SignIn
      appearance={{
        layout: {
          socialButtonsVariant: 'iconButton',
          logoImageUrl: '/images/blob.png',
        },
      }}
    />
  );
}
