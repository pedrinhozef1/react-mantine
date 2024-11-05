import './App.css';
import '@mantine/core/styles.css';
import { ActionIcon, AppShell, Badge, Button, Collapse, createTheme, Group, List, ListItem, MantineProvider, Popover, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ChangeTheme from './components/ChangeTheme';
import LoginPage from './components/login/LoginPage';
import Home from './components/home/Home';
import NotFound from './components/notfound/NotFound';
import NavBar from './components/navbar/LoggedNavBar';
import { useContext, useState } from 'react';
import NotLoggedNavbar from './components/navbar/NotLoggedNavbar';
import RegisterPage from './components/register/RegisterPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VerifyUser from './components/register/VerifyUser';
import ForgotPassword from './components/login/ForgotPassword';
import ResetPassword from './components/login/ResetPassword';
import ChangePassword from './components/login/ChangePassword';
import AuthContext from './context/AuthenticatedUserContext';
import UserList from './components/user/UserList';
import { IconBell } from '@tabler/icons-react';

function App() {
  const theme = createTheme({

  });

  const [opened, { toggle }] = useDisclosure();
  // const [notificationOpened, { toggleNotification }] = useDisclosure(true);

  const {signed} = useContext(AuthContext)

  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Notification 1' },
    { id: 2, text: 'Notification 2' },
    { id: 3, text: 'Notification 3' },
  ]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenNotifications = (event) => {
    setAnchorEl(event.currentTarget);
    console.log('open')
  };

  const handleCloseNotifications = () => {
    setAnchorEl(null);
    console.log('close')

  };

  const open = Boolean(anchorEl);

  return (
      <MantineProvider theme={theme}>
        <BrowserRouter>
          <AppShell
            header={{ height: 60 }}
            navbar={{ width: signed ? 200 : 0, breakpoint: signed ? 'sm' : null, collapsed: signed ? { mobile: !opened } : null }}
            padding="md"
            // disabled={!isLogged}
          >
            <AppShell.Header>
              <Group h="100%" px="md" justify={'center'}>
                {/* <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" /> */}
                <ChangeTheme />

                <Popover width={200} position="bottom" withArrow shadow="md">
                <Popover.Target>
                    <ActionIcon>
                      <IconBell size={20}/>
                    </ActionIcon>
                </Popover.Target>
                <Popover.Dropdown>
                  <List>
                    {notifications.map((item) => (
                      <ListItem>
                        {item.id} - {item.text}
                      </ListItem>
                    ))}
                  </List>
                </Popover.Dropdown>
              </Popover>

               

                {!signed && (
                  <Group h="100%" px="md" justify={'center'}>
                    <NotLoggedNavbar />
                  </Group>
                  
                )}

              </Group>
            </AppShell.Header>

            {signed && (
              <AppShell.Navbar p="md">
                <NavBar />
              </AppShell.Navbar>
            )}
            
            <AppShell.Main>
              <ToastContainer />
              <Routes>

                {signed && (
                  <>
                    <Route path='/users' element={<UserList />}></Route>
                    <Route path='/change-password' element={<ChangePassword />} ></Route>
                  </>

                )}

                <Route path='/home' element={<Home />}></Route>
                <Route path='/register' element={<RegisterPage />} ></Route>
                <Route path='/login' element={<LoginPage />} ></Route>
                <Route path='/forgot-password' element={<ForgotPassword/>} ></Route>
                <Route path='/reset-password' element={<ResetPassword />} ></Route>
                <Route path='/verify' element={<VerifyUser/> } ></Route>
                <Route path='*' element={<NotFound />}></Route>
              </Routes>
            </AppShell.Main>

          </AppShell>
        </BrowserRouter>
      </MantineProvider>
  );
}

export default App;
