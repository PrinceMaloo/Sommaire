import { FileText } from 'lucide-react';
import { Button } from '../ui/button';
import NavLink from './nav-link';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

export default function Header() {
  const isLoggedIn = false;
  return (
    <nav className="flex justify-around items-center">
      <div className="">
        <NavLink href="/" className="flex items-center gap-2">
          <FileText
            className="w-5 lg:w-8 h-5 lg:h-8 text-gray-500 hover:rotate-12 transform transition duration-200 
        ease-in-out
        "
          />
          <span className="font-extrabold lg:text-xl text-gray-900">
            Sommaire
          </span>
        </NavLink>
      </div>
      <div className="flex gap-2 items-center">
        <NavLink href="/#pricing">Pricing</NavLink>
        <SignedIn>
          <NavLink href="/dashboard">Dashboard</NavLink>
        </SignedIn>
      </div>
      <div className="">
        <SignedIn>
          <div className="flex gap-2 lg:gap-5 items-center">
            <NavLink href="/upload">Upload PDF</NavLink>
          </div>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <NavLink href="/sign-in">Sign-in </NavLink>
        </SignedOut>
      </div>
    </nav>
  );
}
