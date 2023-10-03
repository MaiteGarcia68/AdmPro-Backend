const getMenu = ( role = 'USER_ROLE') => {

    const menu = [
        {
          title: 'Dashboard',
          icon: 'mdi mdi-gauge',
          subMenu: [
            { title: 'Principal', url: './' },
            { title: 'ProgressBar', url: './progress' },
            { title: 'Grafica', url: './grafica1' },
            { title: 'Promesa', url: './promesa' },
            { title: 'Rxjs', url: './rxjs' },
        ]
    },
    {
        title: 'Mantenimientos',
        icon: 'mdi mdi-folder-lock-open',
        subMenu: [
            //{ title: 'Usuarios', url: './users' },
            { title: 'Hospitales', url: './hospitals' },
            { title: 'Medicos', url: './doctors' },
        ]
    },
    ];

    if (role === 'ADMIN_ROLE' ) {
        menu[1].subMenu.unshift({ title: 'Usuarios', url: './users' })
    }
    return menu;
}

module.exports = {
    getMenu
}