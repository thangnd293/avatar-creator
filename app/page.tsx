import Avatar from "@/components/Avatar";
import AvatarEditor from "@/components/AvatarEditor";
import AvatarStatesProvider from "@/components/AvatarStatesProvider";
import Header from "@/components/Header";
import { getInitialAvatar } from "@/helpers";
import { Container, ContentWrapper } from "./page.styles";

export default function Home() {
  const initialAvatar = getInitialAvatar();

  return (
    <AvatarStatesProvider initialStates={initialAvatar}>
      <Container>
        <ContentWrapper>
          <Header />
          <Avatar />
          <AvatarEditor />
        </ContentWrapper>
      </Container>
    </AvatarStatesProvider>
  );
}
