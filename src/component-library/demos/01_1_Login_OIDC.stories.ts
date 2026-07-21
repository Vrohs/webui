import { OIDCProvider, VO } from '@/lib/core/entity/auth-models';
import { Meta, StoryObj } from '@storybook/nextjs';
import { Login } from '@/component-library/pages/Login/Login';

export default {
    title: 'Demos/01_Login',
    component: Login,
} as Meta<typeof Login>;

const cernOIDCProvider: OIDCProvider = {
    name: 'CERN',
    url: 'https://login.cern.ch/adfs/oauth2/authorize',
    clientId: '1234567890',
    clientSecret: '1234567890',
    authorizationUrl: 'https://login.cern.ch/adfs/oauth2/authorize',
    tokenUrl: 'https://login.cern.ch/adfs/oauth2/token',
    refreshTokenUrl: 'https://login.cern.ch/adfs/oauth2/token',
    redirectUrl: 'https://login.cern.ch/adfs/oauth2/authorize',
};

// Carries an iconUrl pointing at a local public/ asset, mirroring how the container
// serves downloaded provider icons through next/image. The CMS tab below shows this
// branded button next to CERN's fallback icon; served via staticDirs so the published
// Storybook stays independent of any remote host.
const IndigoIAMProvider: OIDCProvider = {
    name: 'Indigo IAM',
    url: 'https://accounts.google.com/o/oauth2/v2/auth',
    iconUrl: '/experiment-logo.png',
    clientId: '1234567890',
    clientSecret: '1234567890',
    authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    redirectUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
};

const voAtlas: VO = {
    name: 'ATLAS',
    shortName: 'atl',
    logoUrl: 'https://atlas.cern/wp-content/uploads/2019/07/ATLAS-Logo-1.png',
    oidcEnabled: true,
    oidcProviders: [cernOIDCProvider],
};

const voCMS: VO = {
    name: 'CMS',
    shortName: 'cms',
    logoUrl: 'https://atlas.cern/wp-content/uploads/2019/07/ATLAS-Logo-1.png',
    oidcEnabled: true,
    oidcProviders: [cernOIDCProvider, IndigoIAMProvider],
};

const voLHCb: VO = {
    name: 'LHCb',
    shortName: 'lhcb',
    logoUrl: 'https://atlas.cern/wp-content/uploads/2019/07/ATLAS-Logo-1.png',
    oidcEnabled: true,
    oidcProviders: [cernOIDCProvider],
};

type Story = StoryObj<typeof Login>;

export const AMultiVOOIDCEnabledLogin: Story = {
    args: {
        loginViewModel: {
            status: 'success',
            userpassEnabled: true,
            x509Enabled: true,
            oidcEnabled: true,
            oidcProviders: [cernOIDCProvider],
            multiVOEnabled: true,
            voList: [voAtlas, voCMS, voLHCb],
            isLoggedIn: false,
            accountActive: undefined,
            accountsAvailable: undefined,
            rucioAuthHost: 'https://rucio.cern.ch',
        },
        authViewModel: {
            status: 'success',
            message: '',
            rucioAccount: '',
            rucioMultiAccount: '',
            rucioAuthType: '',
            rucioAuthToken: '',
            rucioIdentity: '',
            rucioAuthTokenExpires: '',
            role: undefined,
        },
    },
    play: async ({ container }) => {
        voAtlas.oidcEnabled = true;
        voCMS.oidcEnabled = true;
        voLHCb.oidcEnabled = true;
    },
};

/**
 * A deployment that authenticates purely through OIDC: userpass and x509 are both
 * off, so the only login options are the configured providers. Indigo IAM renders
 * its configured iconUrl, CERN falls back to the default icon.
 */
export const BOIDCOnlyLogin: Story = {
    args: {
        loginViewModel: {
            status: 'success',
            userpassEnabled: false,
            x509Enabled: false,
            oidcEnabled: true,
            oidcProviders: [cernOIDCProvider, IndigoIAMProvider],
            multiVOEnabled: false,
            voList: [voCMS],
            isLoggedIn: false,
            accountActive: undefined,
            accountsAvailable: undefined,
            rucioAuthHost: 'https://rucio.cern.ch',
        },
        authViewModel: {
            status: 'success',
            message: '',
            rucioAccount: '',
            rucioMultiAccount: '',
            rucioAuthType: '',
            rucioAuthToken: '',
            rucioIdentity: '',
            rucioAuthTokenExpires: '',
            role: undefined,
        },
    },
};
