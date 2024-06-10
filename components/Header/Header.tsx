import DownloadButton from "./DownloadButton";
import { Logo, Wrapper } from "./Header.styles";

function Header() {
  return (
    <Wrapper>
      <Logo>Avator</Logo>
      <DownloadButton />
    </Wrapper>
  );
}

export default Header;
