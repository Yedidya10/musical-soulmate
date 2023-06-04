import styles from './PrivacyPolicy.module.scss'
import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'

export interface IPrivacyPolicy {}

const PrivacyPolicy: React.FC<IPrivacyPolicy> = () => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Button
        variant="text"
        sx={{
          ma: 0,
          pa: 0,
          fontSize: '.7rem',
          fontWeight: 'bold',
          color: '#fff',
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
        onClick={handleOpen}
      >
        Privacy Policy
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogTitle variant="h1" sx={{ textAlign: 'center' }}>
          Privacy Policy for Musical Soulmate Mailing List
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            <List>
              <ListItem>
                <ListItemText primary="Introduction" />
                <Typography gutterBottom>
                  Musical Soulmate is committed to protecting your privacy and
                  ensuring the confidentiality of your personal data. This
                  Privacy Policy outlines the types of personal information we
                  collect when you subscribe to our mailing list, how we use
                  that information, and the measures we take to safeguard it.
                </Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Collection of Personal Information" />

                <Typography gutterBottom>
                  We collect personal data provided by you, including your name,
                  email address, and in some cases, demographic information such
                  as your country, city, and preferences when you subscribe to
                  our mailing list.
                </Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Use of Personal Information" />

                <Typography gutterBottom>
                  We use the information collected to send you newsletters,
                  updates, promotional offers, surveys, and other relevant
                  communication related to our company. Your personal data may
                  also be used to analyze trends and customer interests to help
                  us improve our services and products.
                </Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Data Sharing and Disclosure" />

                <Typography gutterBottom>
                  Musical Soulmate does not sell, trade, or rent your personal
                  information to third parties. We may disclose your personal
                  data to third-party service providers who perform functions on
                  our behalf, such as email service providers, only if they
                  agree to treat your personal information as per the privacy
                  standards outlined in this policy.
                </Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Data Security" />

                <Typography gutterBottom>
                  We implement various security measures to protect the security
                  of your personal information. Your data is stored in a secure
                  environment and is accessible only by designated staff or
                  authorized service providers.
                </Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Your Rights" />

                <Typography gutterBottom>
                  You have the right to access, correct, or delete your personal
                  information at any time. You also have the right to
                  unsubscribe from our mailing list at any time by clicking on
                  the &quot;unsubscribe&quot; link in any of our emails.
                </Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Cookies and Other Technologies" />
                <Typography gutterBottom>
                  Our emails may use &quot;cookies&quot; and other technologies to track
                  the effectiveness of our communications. You have the option
                  to disable cookies through your browser settings.
                </Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Changes to the Privacy Policy" />
                <Typography gutterBottom>
                  Musical Soulmate reserves the right to amend this policy at
                  any time. We will notify you of any changes by posting the new
                  policy on this page.
                </Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Contact Us" />
                <Typography gutterBottom>
                  If you have any questions or concerns regarding this policy,
                  please contact us at yedidya.dev@gmail.com Please note that by
                  subscribing to our mailing list, you consent to the terms of
                  this Privacy Policy.
                </Typography>
              </ListItem>
            </List>
            <Typography variant="caption" sx={{ textAlign: 'center' }}>
              Last updated: June 4 2023
            </Typography>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PrivacyPolicy
