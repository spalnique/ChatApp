import { ActiveChat, AnimatedWrapper, AppBar, Sidebar } from '@components';
import { HeaderWrapperStyled, MainWrapperStyled } from '@styled';

export default function MainPage() {
  return (
    <AnimatedWrapper animationKey={'mainPage'}>
      <HeaderWrapperStyled>
        <AppBar />
      </HeaderWrapperStyled>
      <MainWrapperStyled>
        <Sidebar />
        <ActiveChat />
      </MainWrapperStyled>
    </AnimatedWrapper>
  );
}
