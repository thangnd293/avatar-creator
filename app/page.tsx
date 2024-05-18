import { Container } from "./page.styled";
import AvatarStatesProvider from "@/components/AvatarStatesProvider";
import Header from "@/components/Header";
import Avatar from "@/components/Avatar";
import AvatarEditor from "@/components/AvatarEditor";

export default function Home() {
  return (
    <Container>
      <AvatarStatesProvider>
        <Header />
        <Avatar />
        <AvatarEditor />
      </AvatarStatesProvider>
    </Container>
  );
}
