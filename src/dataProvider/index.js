export default type => {
    switch (type) {
        case 'graphql':
        default:
            return import('./graphql').then(factory => factory.default());
            // return import('./rest').then(provider => provider.default);
    }
};
