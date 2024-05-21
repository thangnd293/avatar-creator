import Avatar from "@/components/Avatar";
import AvatarEditor from "@/components/AvatarEditor";
import Header from "@/components/Header";
import { Container, ContentWrapper } from "./page.styled";
import AvatarStatesProvider from "@/components/AvatarStatesProvider";
import { cookies } from "next/headers";

export default function Home() {
  const cookie = cookies();

  const initialBackground = cookie.get("background")?.value;
  const style: Record<string, string | undefined> = {
    "--background-color": initialBackground,
  };

  let initialAvatar: Record<string, number> | undefined;

  if (typeof cookie.get("avatarStates")?.value === "string") {
    initialAvatar = JSON.parse(cookie.get("avatarStates")!.value);
  }

  return (
    <AvatarStatesProvider initialStates={initialAvatar}>
      <Container style={style}>
        <ContentWrapper>
          <Header />
          <Avatar />
          <AvatarEditor initialBackground={initialBackground} />
        </ContentWrapper>
      </Container>
    </AvatarStatesProvider>
  );
}
