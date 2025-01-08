import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material';

const Logo = () => {
  const customizer = useSelector((state) => state.customizer);

  // Styled link component
  const LinkStyled = styled(Link)(() => ({
    height: customizer.TopbarHeight,
    width: customizer.isCollapse ? '40px' : '180px',
    overflow: 'hidden',
    display: 'block',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '24px',
  }));

  // Return the text based on the activeDir (LTR or RTL) and activeMode (light or dark)
  if (customizer.activeDir === 'ltr') {
    return (
      <LinkStyled to="/">
        <span style={{ color: customizer.activeMode === 'dark' ? '#fff' : '#000' }}>
          IKSHANA
        </span>
      </LinkStyled>
    );
  }

  return (
    <LinkStyled to="/">
      <span style={{ color: customizer.activeMode === 'dark' ? '#fff' : '#000' }}>
        IKSHANA
      </span>
    </LinkStyled>
  );
};

export default Logo;
