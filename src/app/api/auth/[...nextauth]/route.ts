import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from "../../../lib/supabaseClient";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  events: {
    async signIn({ user }) {
      const { data, error } = await supabase
        .from('users')
        .select()
        .eq('email', user.email)
        .single();

      if (error || !data) {
        // User doesn't exist, so add them to the database
        const { error: insertError } = await supabase
          .from('users')
          .insert({
            email: user.email,
            name: user.name,
            image: user.image,
          });

        if (insertError) {
          console.error('Error adding user to database:', insertError);
        }
      }
    },
  },
});

export { handler as GET, handler as POST };

