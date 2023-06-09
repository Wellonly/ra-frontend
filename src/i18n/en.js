import englishMessages from 'ra-language-english';

export default {
    ...englishMessages,
    pos: {
        search: 'Search',
        configuration: 'Configuration',
        language: 'Language',
        theme: {
            name: 'Theme',
            light: 'Light',
            dark: 'Dark',
        },
        dashboard: {
            monthly_revenue: 'Monthly Revenue',
            month_history: '30 Day Revenue History',
            new_orders: 'New Orders',
            pending_reviews: 'Pending Reviews',
            new_customers: 'New Customers',
            pending_orders: 'Pending Orders',
            order: {
                items:
                    'by %{customer_name}, one item |||| by %{customer_name}, %{nb_items} items',
            },
            welcome: {
                title: 'Welcome to our beauty shop',
                subtitle: "This is the admin panel of the shop.",
                aor_button: 'WebStudio.tech',
                demo_button: 'WebStudio.tech/portfolio',
            },
        },
        menu: {
            sales: 'Sales',
            catalog: 'Catalog',
            customers: 'Customers',
            info: 'Info',
            options: 'Configurations',
            mail: 'Mail',
            inbox: 'Inbox',
            outbox: 'Outbox',
            draft: 'Draft',
            basket: 'Deleted',
            trash: 'Trashed',
            undefined: 'Undefined'
        },
    },
    resources: {
        customers: {
            name: 'Customer |||| Customers',
            fields: {
                commands: 'Orders',
                first_seen: 'First seen',
                groups: 'Segments',
                last_seen: 'Last seen',
                last_seen_gte: 'Visited Since',
                name: 'Name',
                total_spent: 'Total spent',
                password: 'Password',
                confirm_password: 'Confirm password',
            },
            fieldGroups: {
                identity: 'Identity',
                address: 'Address',
                stats: 'Stats',
                history: 'History',
                password: 'Password',
                change_password: 'Change Password',
            },
            page: {
                delete: 'Delete Customer',
            },
            errors: {
                password_mismatch:
                    'The password confirmation is not the same as the password.',
            },
        },
        commands: {
            name: 'Order |||| Orders',
            amount: '1 order |||| %{smart_count} orders',
            title: 'Order %{sku}',
            fields: {
                sku: 'SKU',
                basket: {
                    delivery: 'Delivery',
                    sku: 'SKU',
                    quantity: 'Quantity',
                    sum: 'Sum',
                    tax_rate: 'Tax Rate',
                    total: 'Total',
                    unit_price: 'Unit Price',
                },
                customer_id: 'Customer',
                date_gte: 'Passed Since',
                date_lte: 'Passed Before',
                total_gte: 'Min amount',
                status: 'Status',
                returned: 'Returned',
            },
        },
        invoices: {
            name: 'Invoice |||| Invoices',
            fields: {
                date: 'Invoice date',
                customer_id: 'Customer',
                command_id: 'Order',
                date_gte: 'Passed Since',
                date_lte: 'Passed Before',
                total_gte: 'Min amount',
                address: 'Address',
            },
        },
        products: {
            name: 'Goods |||| Goods',
            fields: {
                category_id: 'Category',
                sku: 'SKU',
                title: 'Title',
                slug: 'Page name',
                variant: 'Variant',
                priority: 'Priority',
                highprice: 'HighPrice',
                price: 'Price',
                optprice: 'Mass price',
                optfrom: 'Mass quantity',
                video: 'Video',
                images: 'Images',
                description: 'Description',
                stock: 'Stock',
                spec: 'Specification',
                weight: 'Weight',
                length: 'length',
                width: 'Width',
                height: 'Height',
                artimages: 'Article images',
                article: 'Article',
                price_gte: 'Price great or equal',
                price_lte: 'Price less or equal',
                stock_lte: 'Stock less or equal',
                collection: 'Collection',
            },
            tabs: {
                image: 'Image',
                details: 'Details',
                description: 'Description',
                spec: 'Specification',
                article: 'Article',
                reviews: 'Reviews',
            },
        },
        categories: {
            name: 'Category |||| Categories',
            empty: 'Empty',
            fields: {
                name: 'Name',
                slug: 'Page name',
                priority: 'Priority',
                products: 'Products',
            },
        },
        cities: {
            name: 'City |||| Cities',
            empty: 'Empty',
            fields: {
                name: 'Name',
                area: 'Area',
                countryCode: 'Country',
                phone: 'City phone code',
                postal: 'Postal code',
                latitude: 'Latitude',
                longitude: 'Longitude',
                rating: 'Rating',
                offices: 'Offices',
            },
        },
        collections: {
            name: 'Collection |||| Collections',
            empty: 'Empty',
            fields: {
                name: 'Name',
                slug: 'Page name',
                priority: 'Priority',
                products: 'Products',
            },
        },
        reviews: {
            name: 'Review |||| Reviews',
            amount: '1 review |||| %{smart_count} reviews',
            relative_to_goods: 'Review on goods',
            detail: 'Review detail',
            fields: {
                customer_id: 'Customer',
                command_id: 'Order',
                product_id: 'Product',
                date_gte: 'Posted since',
                date_lte: 'Posted before',
                date: 'Date',
                comment: 'Comment',
                rating: 'Rating',
            },
            action: {
                accept: 'Accept',
                reject: 'Reject',
            },
            notification: {
                approved_success: 'Review approved',
                approved_error: 'Error: Review not approved',
                rejected_success: 'Review rejected',
                rejected_error: 'Error: Review not rejected',
            },
        },
        segments: {
            name: 'Segments',
            fields: {
                customers: 'Customers',
                name: 'Name',
            },
            data: {
                compulsive: 'Compulsive',
                collector: 'Collector',
                ordered_once: 'Ordered once',
                regular: 'Regular',
                returns: 'Returns',
                reviewer: 'Reviewer',
            },
        },
        links: {
            name: 'Link |||| Links',
            newlabel: 'New label',
            empty: 'Empty',
            menu: {
                top: 'Menu of header',
                left: 'Menu on left',
                bottom: 'Menu of footer',
                right: 'Menu on right',
            },
            fields: {
                priority: 'Priority',
                label: 'Label',
                icon: 'Icon',
                slug: 'Page name',
                component: 'Component',
                sublinks: 'Sublinks',
            },
            tabs: {
                link: 'Link',
                content: 'Content',
                template: 'Template',
            },
        },
        sublinks: {
            name: 'Sublink |||| Sublinks',
            newlabel: 'New sublink',
            empty: 'empty',
            fields: {
                link_id: 'Parent link',
                priority: 'Priority',
                label: 'Label',
                icon: 'Icon',
                slug: 'Page name',
                component: 'Component',
            },
        },
        carriers: {
            name: 'Carrier |||| Carriers',
            newlabel: 'New carrier',
            empty: 'empty',
            fields: {
                priority: 'Priority',
                title: 'Title',
                icon: 'Icon',
                slug: 'Page name',
                calc: 'Component',
            },
            tabs: {
                carrier: 'Carrier',
                description: 'description',
                calc: 'Calculation',
                content: 'Content',
                template: 'Template',
            },
        },
        offices: {
            name: 'Office |||| Offices',
            newlabel: 'New office',
            empty: 'empty',
            fields: {
                priority: 'Priority',
                services: 'Services',
                title: 'Title',
                slug: 'Page name',
                descript: 'Description',
                address: 'Address',
                latitude: 'Latitude',
                longitude: 'Longitude',
                worktime: 'Worktime',
                phone: 'Phone',
            },
            tabs: {
                office: 'Office',
                description: 'description',
                content: 'Content',
                template: 'Template',
            },
        },
        paymethods: {
          name: 'Paymethod |||| Paymethods',
          newlabel: 'New paymethod',
          empty: 'empty',
          fields: {
            priority: 'Priority',
            title: 'Title',
            icon: 'Icon',
            slug: 'Page name',
            calc: 'Component',
          },
          tabs: {
            paymethod: 'Paymethod',
            description: 'description',
            calc: 'Calculation',
            content: 'Content',
            template: 'Template',
          },
        },
        options: {
          name: 'Option |||| Options',
          newlabel: 'New option',
          empty: 'Empty',
          group: {
            system: 'System',
            example: 'example',
          },
          datatype: {
            string: 'String',
            number: 'Number',
          },
          fields: {
            group: 'Group',
            name: 'Name',
            datatype: 'Datatype',
            value: 'Value',
            descript: 'Description',
          },
        },
        folders: {
            name: 'Folder |||| Folders',
            outbox: 'Outbox folder |||| Outbox folders',
            inbox: 'Inbox folder |||| Inbox folders',
            newlabel: 'New folder',
            empty: 'empty',
            fields: {
                user_id: 'Owner',
                priority: 'Priority',
                place: 'Place',
                name: 'Name',
                icon: 'Icon',
                color: 'Color',
                slug: 'Page name',
                filter: 'Filter',
            },
        },
        users: {
            name: 'User |||| Users',
            empty: 'Empty',
            fields: {
                username: 'User name',
                slug: 'Page name',
                priority: 'Priority',
                email: 'Email',
                phone: 'Phone',
                email2: 'Email 2',
                phone2: 'phone 2',
                role: 'Role',
                descript: 'Description',
                folders: 'Folders',
                messages: 'Messages',
            },
            tabs: {
                user: 'User',
                descript: 'Description',
                folders: 'Folders',
                messages: 'Messages',
            },
        },
        messages: {
            name: 'Message |||| Messages',
            newlabel: 'New message',
            new_message: 'New message from %{from}: %{title}',
            empty: 'empty',
            fields: {
                user_id: 'From whom',
                to_id: 'To whom',
                sentAt: 'Sent',
                readAt: 'Read',
                title: 'Title',
                text: 'Text',
                status: 'Status',
            },
        },

    },
    spell: {
        images: 'Images',
        article: 'Article',
        addImagesToArticle: 'Add images to content',
        loading: 'Loading...',
        error: 'something went wrong',
        saveAsDraft: 'Save as draft',
        today: 'Today',
        thisWeek: 'This week',
        lastWeek: 'Last week',
        thisMonth: 'This month',
        lastMonth: 'Last month',
        last2Month: 'Last 2 month',
        category: 'Category',
        users: 'Users',
        folders: 'Folders',
        fromMe: 'from me',
        toMe: 'to me',
        send: 'Send',
        direction: 'Direction',
    },
    auth: {
        invalid_user_name_or_password: 'Invalid user name or password',
    },
    config: {
        interface: 'Interface',
        security: 'Security',
        current_password: 'Current password',
        new_password: 'New password',
        change_password: 'Change password',
        password_changed: 'Password updated',
    },
};
