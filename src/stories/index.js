/*
 * Copyright 2019 SURF.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import React from "react";

import { storiesOf, addDecorator } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, array, boolean, number, select } from "@storybook/addon-knobs";
import { State, Store, StateDecorator } from "@sambego/storybook-state";
import "react-datepicker/dist/react-datepicker.css";
import SubscriptionProductTagSelect from "../components/SubscriptionProductTagSelect";
import "../pages/App.scss";
import "./storybook.scss";
import GenericSelect from "../components/GenericSelect";
import BandwidthSelect from "../components/BandwidthSelect";
import TableSummary from "../components/TableSummary";
import UserInputContainer from "./UserInputContainer";
import {
    allNodeSubscriptions,
    contactPersons,
    corelinkPorts10G,
    LOCATION_CODES,
    ORGANISATIONS,
    PRODUCTS,
    SN7PortSubscriptions,
    SN8PortSubscriptions,
    imsNodes,
    freeCorelinkPorts
} from "./data";
import LocationCodeSelect from "../components/LocationCodeSelect";
import ApplicationContext from "../utils/ApplicationContext";
import fetchMock from "fetch-mock";
import { loadVlanMocks } from "./utils";
import GenericNOCConfirm from "../components/GenericNOCConfirm";
import MultipleServicePorts from "../components/MultipleServicePorts";
import { formDate } from "../forms/Builder";
import UserInputFormWizard from "../components/UserInputFormWizard";

const tableSummaryDataDefinition = [
    { labels: ["Label1", "Label 2", "Label 3"] },
    { columns: [["value1", "value2", "value3 with slightly longer text"]] }
];

const tableSummaryDataWithHeaders = [
    { headers: ["Old Values", "New Values"] },
    {
        columns: [["value1", "value2", "value3"], ["new value1", "new value2", "new value3"]]
    }
];

const tableSummaryDataDefinitionWithHeaders = [
    { labels: ["Label1", "Label 2", "Label 3"] },
    { headers: ["Old Values", "New Values"] },
    {
        columns: [["value1", "value2", "value3"], ["new value1", "new value2", "new value3"]]
    }
];

const nodeSteps = [
    {
        name: "ims_node_id",
        type: "nodes_for_location_code_and_status",
        location_code: "MT001A"
    }
];

const contactPersonSteps = [
    { name: "organisation", type: "organisation" },
    {
        name: "contact_persons",
        organisation_key: "organisation",
        type: "contact_persons"
    }
];

const corelinkSteps = [
    {
        service_speed: "1000BASE-LX",
        name: "ims_port_id_1",
        type: "corelink",
        location_code: "MT001A"
    },
    {
        service_speed: "1000BASE-LX",
        name: "ims_port_id_2",
        type: "corelink",
        location_code: "MT001A"
    }
];

const addCorelinkSteps = [
    {
        name: "ims_port_id_1",
        type: "corelink_add_link",
        node: "d38d8b25-d9f5-4a25-b1b0-d29057c47420",
        service_speed: "1000BASE-LX"
    },
    {
        name: "ims_port_id_2",
        type: "corelink_add_link",
        node: "5d2123e6-197d-4bb6-93c6-446d474d98fd",
        service_speed: "1000BASE-LX"
    }
];

const sn7PortSelectInputStepsAllOrganisations = [
    { name: "organisation", type: "organisation" },
    {
        name: "bandwidth",
        ports_key: ["service_ports"],
        readonly: false,
        type: "bandwidth"
    },
    {
        maximum: 6,
        minimum: 1,
        name: "bgp_ip_service_ports",
        organisationPortsOnly: false,
        organisation_key: "organisation",
        type: "service_ports",
        mspOnly: false
    }
];

const sn7PortSelectInputStepsMSPOnly = [
    { name: "organisation", type: "organisation" },
    {
        name: "bandwidth",
        ports_key: ["service_ports"],
        readonly: false,
        type: "bandwidth"
    },
    {
        maximum: 6,
        minimum: 1,
        name: "bgp_ip_service_ports",
        organisationPortsOnly: false,
        organisation_key: "organisation",
        type: "service_ports",
        mspOnly: true
    }
];

const sn7PortSelectInputStepsSelectedOrganisation = [
    { name: "organisation", type: "organisation" },
    {
        name: "bandwidth",
        ports_key: ["service_ports"],
        readonly: false,
        type: "bandwidth"
    },
    {
        maximum: 6,
        minimum: 1,
        name: "bgp_ip_service_ports",
        organisationPortsOnly: true,
        organisation_key: "organisation",
        type: "service_ports",
        mspOnly: false
    }
];

const sn8PortSelectInputStepsAllOrganisations = [
    { name: "organisation", type: "organisation" },
    {
        name: "bandwidth",
        ports_key: ["service_ports"],
        readonly: false,
        type: "bandwidth"
    },
    {
        maximum: 2,
        minimum: 2,
        name: "bgp_ip_service_ports",
        organisationPortsOnly: false,
        organisation_key: "organisation",
        type: "service_ports_sn8",
        visiblePortMode: "normal"
    }
];

const sn8PortSelectInputStepsTagged = [
    { name: "organisation", type: "organisation" },
    {
        name: "bandwidth",
        ports_key: ["service_ports"],
        readonly: false,
        type: "bandwidth"
    },
    {
        maximum: 6,
        minimum: 2,
        name: "bgp_ip_service_ports",
        organisationPortsOnly: false,
        organisation_key: "organisation",
        type: "service_ports_sn8",
        visiblePortMode: "tagged"
    }
];

const sn8PortSelectInputStepsUntagged = [
    { name: "organisation", type: "organisation" },
    {
        name: "bandwidth",
        ports_key: ["service_ports"],
        readonly: false,
        type: "bandwidth"
    },
    {
        maximum: 6,
        minimum: 1,
        name: "bgp_ip_service_ports",
        organisationPortsOnly: false,
        organisation_key: "organisation",
        type: "service_ports_sn8",
        visiblePortMode: "untagged"
    }
];

const sn8PortSelectInputStepsSelectedOrganisation = [
    { name: "organisation", type: "organisation" },
    {
        name: "bandwidth",
        ports_key: ["service_ports"],
        readonly: false,
        type: "bandwidth"
    },
    {
        maximum: 6,
        minimum: 1,
        name: "bgp_ip_service_ports",
        organisationPortsOnly: true,
        organisation_key: "organisation",
        type: "service_ports_sn8",
        visiblePortMode: "normal"
    }
];

const store = new Store({
    servicePorts: [{ subscription_id: null, vlan: "" }],
    selected: "",
    locationCode: "",
    date: new Date(1),
    value: "1000"
});

function withContext(storyFn) {
    return (
        <ApplicationContext.Provider
            value={{
                organisations: ORGANISATIONS,
                locationCodes: LOCATION_CODES,
                products: PRODUCTS,
                currentUser: {},
                configuration: undefined,
                redirect: action("Change url")
            }}
        >
            {storyFn()}
        </ApplicationContext.Provider>
    );
}
addDecorator(withContext);

storiesOf("Welcome", module).add("to Storybook", () => (
    <div>
        <h1>Workflows client storybook</h1>
        <p>Welcome to the storybook. We will demonstrate some of the components here.</p>
        <p>
            <b>
                The storybook will use mocks for the components that need data. So you could see other data then you're
                used to.
            </b>
        </p>
        <p>
            All the UserInputForms examples use a Wrapper component to simulate the form elements as they are used with
            the workflow engine
        </p>
    </div>
));

storiesOf("SubscriptionProductTagSelect", module)
    .add("Only tags", () => {
        fetchMock.restore();
        fetchMock.get("/api/subscriptions/tag/SP%2CMSP/", SN7PortSubscriptions);
        return <SubscriptionProductTagSelect onChange={action("clicked")} tags={["SP", "MSP"]} />;
    })
    .add("Filtered on Product", () => {
        fetchMock.restore();
        fetchMock.get("/api/subscriptions/tag/SP%2CMSP/", SN7PortSubscriptions);
        return (
            <SubscriptionProductTagSelect
                onChange={action("clicked")}
                tags={["SP", "MSP"]}
                // Fetch MSP 1G
                productId="efbe1235-93df-49ee-bbba-e51434e0be17"
            />
        );
    })
    .add("Filtered on Product with excluded subs", () => {
        fetchMock.restore();
        fetchMock.get("/api/subscriptions/tag/SP%2CMSP/", SN7PortSubscriptions);
        return (
            <SubscriptionProductTagSelect
                onChange={action("clicked")}
                tags={["SP", "MSP"]}
                // Fetch MSP 1G
                productId="efbe1235-93df-49ee-bbba-e51434e0be17"
                excludedSubscriptionIds={[
                    "ac8c28ba-60e8-4d31-9d42-6c04a616677b",
                    "83c6facb-8764-4adf-8fb7-79923b111b38"
                ]}
            />
        );
    });

storiesOf("GenericSelect", module)
    .addDecorator(withKnobs)
    .addDecorator(StateDecorator(store))
    .add("Default", () => (
        <GenericSelect
            selected={store.state.selected}
            onChange={e => {
                action("onChange")(e);
                store.set({ selected: e.value });
            }}
            disabled={boolean("Disabled")}
            choices={array("Values", ["SAP 1", "SAP 2", "SAP 3"])}
        />
    ));

storiesOf("LocationCodeSelect", module)
    .addDecorator(withKnobs)
    .addDecorator(StateDecorator(store))
    .add("Default", () => (
        <LocationCodeSelect
            id="location-code-select"
            locationCode={store.state.locationCode}
            locationCodes={array("Values", LOCATION_CODES)}
            onChange={e => {
                action("onChange")(e);
                store.set({ locationCode: e.value });
            }}
            disabled={boolean("Disabled")}
        />
    ));

storiesOf("TableSummary", module)
    .add("Definition", () => <TableSummary data={tableSummaryDataDefinition} />)
    .add("Summary with headers", () => <TableSummary data={tableSummaryDataWithHeaders} />)
    .add("Summary with definition and headers", () => <TableSummary data={tableSummaryDataDefinitionWithHeaders} />);

storiesOf("DatePicker", module).add("Definition", () => (
    <State store={store}>
        {state =>
            formDate(
                "metadata.productBlocks.created_at",
                e => {
                    action("onChange")(e);
                    store.set({ date: e });
                },
                false,
                state.date
            )
        }
    </State>
));

storiesOf("GenericNOCConfirm", module)
    .add("Legacy", () => (
        <GenericNOCConfirm name="noc_remove_static_ip_confirmation" onChange={action("changed checkbox: ")} />
    ))
    .add("Complex", () => (
        <GenericNOCConfirm
            name="confirm_migrate_sap"
            onChange={action("changed checkbox: ")}
            data={[
                ["confirm_migrate_sap", "label"],
                ["confirm_migrate_sap_info", "info"],
                ["next_step_service_affecting", "warning"],
                ["http://example.com", "url"],
                ["check_delete_sn7_service_config", "checkbox"],
                ["check_ims_defined", "label"],
                ["check_ims_circuit", ">checkbox", { circuit_name: "ims circuit 1" }],
                ["check_ims_circuit", ">checkbox", { circuit_name: "ims circuit 2" }],
                ["check_port_patched_sn7_sn8", "checkbox?"]
            ]}
        />
    ))
    .add("Legacy in form", () => {
        fetchMock.restore();
        fetchMock.get("/api/v2/subscriptions/ports?filter=tags,MSP-SSP-MSPNL&filter=statuses,active", []);
        fetchMock.get("/api/v2/subscriptions/ports?filter=tags,SP-SPNL&filter=statuses,active", []);
        fetchMock.get("/api/v2/subscriptions/all", []);
        return (
            <UserInputContainer
                formName="NOC Confirm"
                stepUserInput={[{ name: "noc_remove_static_ip_confirmation", type: "accept" }]}
            />
        );
    })
    .add("Complex in form", () => {
        fetchMock.restore();
        fetchMock.get("/api/v2/subscriptions/ports?filter=tags,MSP-SSP-MSPNL&filter=statuses,active", []);
        fetchMock.get("/api/v2/subscriptions/ports?filter=tags,SP-SPNL&filter=statuses,active", []);
        fetchMock.get("/api/v2/subscriptions/all", []);
        return (
            <UserInputContainer
                formName="NOC Confirm"
                stepUserInput={[
                    {
                        name: "confirm_migrate_sap",
                        type: "accept",
                        data: [
                            ["confirm_migrate_sap", "label"],
                            ["confirm_migrate_sap_info", "info"],
                            ["next_step_service_affecting", "warning"],
                            ["http://example.com", "url"],
                            ["check_delete_sn7_service_config", "checkbox"],
                            ["check_ims_defined", "label"],
                            ["check_ims_circuit", ">checkbox", { circuit_name: "ims circuit 1" }],
                            ["check_ims_circuit", ">checkbox", { circuit_name: "ims circuit 2" }],
                            ["check_port_patched_sn7_sn8", "checkbox?"]
                        ]
                    }
                ]}
            />
        );
    });

storiesOf("MultipleServicePorts", module)
    .addDecorator(withKnobs)
    .addDecorator(StateDecorator(store))
    .add("SN8 MultipleServicePorts", () => {
        fetchMock.restore();
        fetchMock.get("glob:*/api/fixed_inputs/port_speed_by_subscription_id/*", [1000]);
        fetchMock.get(
            "/api/v2/subscriptions/ports?filter=tags,SP-SPNL&filter=statuses,active",
            SN8PortSubscriptions.filter(p => p.status === "active")
        );
        loadVlanMocks();

        return (
            <MultipleServicePorts
                servicePorts={store.state.servicePorts}
                sn8={true}
                organisations={ORGANISATIONS}
                onChange={value => {
                    action("onChange")(value);
                    store.set({ servicePorts: value });
                }}
                organisationId={select(
                    "Organisation",
                    {
                        "Centrum Wiskunde & Informatica": "2f47f65a-0911-e511-80d0-005056956c1a",
                        "Design Academy Eindhoven": "88503161-0911-e511-80d0-005056956c1a",
                        "Academisch Ziekenhuis Maastricht": "bae56b42-0911-e511-80d0-005056956c1a"
                    },
                    ""
                )}
                minimum={number("Minimum nr of ports", 1)}
                maximum={number("Maximum nr of ports", 6)}
                disabled={boolean("Read only?")}
                isElan={boolean("Is ELAN")}
                organisationPortsOnly={boolean("Organization ports only")}
                visiblePortMode={select(
                    "visiblePortMode",
                    ["all", "normal", "tagged", "untagged", "link_member"],
                    "all"
                )}
                disabledPorts={boolean("Disabled ports")}
                reportError={action("reportError")}
                bandwidth={number("Minimum bandwith")}
            />
        );
    })
    .add("SN7 MultipleServicePorts", () => {
        fetchMock.restore();
        fetchMock.get("glob:*/api/fixed_inputs/port_speed_by_subscription_id/*", [1000]);
        fetchMock.get(
            "/api/v2/subscriptions/ports?filter=tags,MSP-SSP-MSPNL&filter=statuses,active",
            SN7PortSubscriptions.filter(p => p.status === "active")
        );
        loadVlanMocks();

        return (
            <MultipleServicePorts
                servicePorts={store.state.servicePorts}
                sn8={false}
                organisations={ORGANISATIONS}
                onChange={value => {
                    action("onChange")(value);
                    store.set({ servicePorts: value });
                }}
                organisationId={select(
                    "Organisation",
                    {
                        "Centrum Wiskunde & Informatica": "2f47f65a-0911-e511-80d0-005056956c1a",
                        "Design Academy Eindhoven": "88503161-0911-e511-80d0-005056956c1a",
                        "Academisch Ziekenhuis Maastricht": "bae56b42-0911-e511-80d0-005056956c1a"
                    },
                    ""
                )}
                minimum={number("Minimum nr of ports", 1)}
                maximum={number("Maximum nr of ports", 6)}
                disabled={boolean("Read only?")}
                isElan={boolean("Is ELAN")}
                organisationPortsOnly={boolean("Organization ports only")}
                mspOnly={boolean("MSP only")}
                disabledPorts={boolean("Disabled ports")}
                reportError={action("reportError")}
                bandwidth={number("Minimum bandwith")}
            />
        );
    });

storiesOf("Bandwidth", module)
    .addDecorator(withKnobs)
    .add("Bandwidth", () => {
        fetchMock.restore();
        fetchMock.get("glob:*/api/fixed_inputs/port_speed_by_subscription_id/48f28a55-7764-4c84-9848-964d14906a27", [
            1000
        ]);
        fetchMock.get("glob:*/api/fixed_inputs/port_speed_by_subscription_id/55c96135-e308-4126-b53f-0a3cf23331f5", [
            10000
        ]);
        return (
            <State store={store}>
                {state => (
                    <BandwidthSelect
                        servicePorts={select(
                            "servicePorts",
                            {
                                "Restricted by service port 1G": [
                                    { subscription_id: "48f28a55-7764-4c84-9848-964d14906a27", tag: "MSP", vlan: "2" }
                                ],
                                "Restricted by service port 10G": [
                                    { subscription_id: "55c96135-e308-4126-b53f-0a3cf23331f5", tag: "MSP", vlan: "2" }
                                ],
                                "Not restricted by service port": []
                            },
                            [{ subscription_id: "48f28a55-7764-4c84-9848-964d14906a27", tag: "MSP", vlan: "2" }]
                        )}
                        name="bandwidth"
                        reportError={action("reportError")}
                        onChange={e => {
                            store.set({ value: e.target.value });
                            action("onChange")(e);
                        }}
                        value={state.value}
                        disabled={boolean("Read only")}
                    />
                )}
            </State>
        );
    });

storiesOf("UserInputForm", module)
    .addDecorator(withKnobs)
    .add("Contactpersons", () => {
        fetchMock.restore();
        fetchMock.get("/api/v2/subscriptions/ports?filter=tags,MSP-SSP-MSPNL&filter=statuses,active", []);
        fetchMock.get("/api/v2/subscriptions/ports?filter=tags,SP-SPNL&filter=statuses,active", []);
        fetchMock.get("/api/v2/subscriptions/all", []);
        fetchMock.get("glob:*/api/crm/contacts/*", contactPersons);
        return <UserInputContainer formName="Organisation and contacts" stepUserInput={contactPersonSteps} />;
    })
    .add("Corelink", () => {
        fetchMock.restore();
        fetchMock.get("/api/v2/subscriptions/ports?filter=tags,MSP-SSP-MSPNL&filter=statuses,active", []);
        fetchMock.get("/api/v2/subscriptions/ports?filter=tags,SP-SPNL&filter=statuses,active", []);
        fetchMock.get("/api/v2/subscriptions?filter=tags,Node&filter=statuses,active-provisioning", []);
        fetchMock.get("/api/v2/subscriptions/all", allNodeSubscriptions);
        fetchMock.get("glob:*/api/ims/free_corelink_ports/*", corelinkPorts10G);
        return <UserInputContainer formName="Corelink form" stepUserInput={corelinkSteps} />;
    })
    .add("Corelink add link", () => {
        fetchMock.restore();
        fetchMock.get("/api/v2/subscriptions/ports?filter=tags,MSP-SSP-MSPNL&filter=statuses,active", []);
        fetchMock.get("/api/v2/subscriptions/ports?filter=tags,SP-SPNL&filter=statuses,active", []);
        fetchMock.get("/api/v2/subscriptions?filter=tags,Node&filter=statuses,active-provisioning", []);
        fetchMock.get("/api/v2/subscriptions/all", allNodeSubscriptions);
        fetchMock.get("glob:*/api/ims/free_corelink_ports/*", freeCorelinkPorts);
        return <UserInputContainer formName="Corelink add link form" stepUserInput={addCorelinkSteps} />;
    })
    .add("Nodes", () => {
        fetchMock.restore();
        fetchMock.get("/api/v2/subscriptions/ports?filter=tags,MSP-SSP-MSPNL&filter=statuses,active", []);
        fetchMock.get("/api/v2/subscriptions/ports?filter=tags,SP-SPNL&filter=statuses,active", []);
        fetchMock.get("/api/v2/subscriptions/all", allNodeSubscriptions);
        fetchMock.get("/api/ims/nodes/MT001A/PL", imsNodes);
        return <UserInputContainer formName="Node form" stepUserInput={nodeSteps} />;
    })
    .add("SN7 Portselect all organisations", () => {
        fetchMock.restore();
        fetchMock.get(
            "/api/v2/subscriptions/ports?filter=tags,MSP-SSP-MSPNL&filter=statuses,active",
            SN7PortSubscriptions.filter(p => p.status === "active")
        );
        fetchMock.get("/api/v2/subscriptions/ports?filter=tags,SP-SPNL&filter=statuses,active", []);
        fetchMock.get("/api/v2/subscriptions/all", []);
        fetchMock.get("glob:*/api/subscriptions/parent_subscriptions/*", []);
        loadVlanMocks();
        return (
            <UserInputContainer
                formName="SN7 portselect form, showing all ports"
                stepUserInput={sn7PortSelectInputStepsAllOrganisations}
            />
        );
    })
    .add("SN7 Portselect MSP only", () => {
        fetchMock.restore();
        fetchMock.get(
            "/api/v2/subscriptions/ports?filter=tags,MSP-SSP-MSPNL&filter=statuses,active",
            SN7PortSubscriptions.filter(p => p.status === "active")
        );
        fetchMock.get("/api/v2/subscriptions/ports?filter=tags,SP-SPNL&filter=statuses,active", []);
        fetchMock.get("/api/v2/subscriptions/all", []);
        fetchMock.get("glob:*/api/subscriptions/parent_subscriptions/*", []);
        loadVlanMocks();
        return (
            <UserInputContainer
                formName="SN7 portselect form, showing all ports"
                stepUserInput={sn7PortSelectInputStepsMSPOnly}
            />
        );
    })
    .add("SN7 Portselect selected organisation", () => {
        fetchMock.restore();
        fetchMock.get(
            "/api/v2/subscriptions/ports?filter=tags,MSP-SSP-MSPNL&filter=statuses,active",
            SN7PortSubscriptions.filter(p => p.status === "active")
        );
        fetchMock.get("/api/v2/subscriptions/ports?filter=tags,SP-SPNL&filter=statuses,active", []);
        fetchMock.get("/api/v2/subscriptions/all", []);
        fetchMock.get("glob:*/api/subscriptions/parent_subscriptions/*", []);
        loadVlanMocks();
        return (
            <UserInputContainer
                formName="SN7 portselect, showing only ports for selected organisation"
                stepUserInput={sn7PortSelectInputStepsSelectedOrganisation}
            />
        );
    })
    .add("SN7 Portselect bandwidth", () => {
        fetchMock.restore();
        fetchMock.get(
            "/api/v2/subscriptions/ports?filter=tags,MSP-SSP-MSPNL&filter=statuses,active",
            SN7PortSubscriptions.filter(p => p.status === "active")
        );
        fetchMock.get("/api/v2/subscriptions/ports?filter=tags,SP-SPNL&filter=statuses,active", []);
        fetchMock.get("/api/v2/subscriptions/all", []);
        fetchMock.get("glob:*/api/subscriptions/parent_subscriptions/*", []);
        fetchMock.get("glob:*/api/fixed_inputs/port_speed_by_subscription_id/*", [1000]);
        loadVlanMocks();
        return (
            <UserInputContainer
                formName="SN7 portselect form, showing all ports"
                stepUserInput={[
                    {
                        name: "service_ports",
                        type: "service_ports",
                        bandwidth_key: "current_bandwidth",
                        minimum: 1
                    },
                    {
                        name: "current_bandwidth",
                        type: "bandwidth",
                        readonly: true,
                        value: number("bandwidth", 1000)
                    },
                    {
                        name: "new_bandwidth",
                        type: "bandwidth",
                        ports_key: "service_ports"
                    }
                ]}
            />
        );
    })
    .add("SN8 Portselect all organisations", () => {
        fetchMock.restore();
        fetchMock.get("/api/v2/subscriptions/ports?filter=tags,MSP-SSP-MSPNL&filter=statuses,active", []);
        fetchMock.get(
            "/api/v2/subscriptions/ports?filter=tags,SP-SPNL&filter=statuses,active",
            SN8PortSubscriptions.filter(p => p.status === "active")
        );
        fetchMock.get("/api/v2/subscriptions/all", []);
        fetchMock.get("glob:*/api/subscriptions/parent_subscriptions/*", []);
        loadVlanMocks();
        return (
            <UserInputContainer
                formName="SN8 portselect form, showing all ports"
                stepUserInput={sn8PortSelectInputStepsAllOrganisations}
            />
        );
    })
    .add("SN8 Portselect tagged", () => {
        fetchMock.restore();
        fetchMock.get("/api/v2/subscriptions/ports?filter=tags,MSP-SSP-MSPNL&filter=statuses,active", []);
        fetchMock.get(
            "/api/v2/subscriptions/ports?filter=tags,SP-SPNL&filter=statuses,active",
            SN8PortSubscriptions.filter(p => p.status === "active")
        );
        fetchMock.get("/api/v2/subscriptions/all", []);
        fetchMock.get("glob:*/api/subscriptions/parent_subscriptions/*", []);
        loadVlanMocks();
        return (
            <UserInputContainer
                formName="SN8 portselect form, showing all ports"
                stepUserInput={sn8PortSelectInputStepsTagged}
            />
        );
    })
    .add("SN8 Portselect untagged", () => {
        fetchMock.restore();
        fetchMock.get("/api/v2/subscriptions/ports?filter=tags,MSP-SSP-MSPNL&filter=statuses,active", []);
        fetchMock.get(
            "/api/v2/subscriptions/ports?filter=tags,SP-SPNL&filter=statuses,active",
            SN8PortSubscriptions.filter(p => p.status === "active")
        );
        fetchMock.get("/api/v2/subscriptions/all", []);
        fetchMock.get("glob:*/api/subscriptions/parent_subscriptions/*", []);
        loadVlanMocks();
        return (
            <UserInputContainer
                formName="SN8 portselect form, showing all ports"
                stepUserInput={sn8PortSelectInputStepsUntagged}
            />
        );
    })
    .add("SN8 Portselect selected organisation", () => {
        fetchMock.restore();
        fetchMock.get("/api/v2/subscriptions/ports?filter=tags,MSP-SSP-MSPNL&filter=statuses,active", []);
        fetchMock.get(
            "/api/v2/subscriptions/ports?filter=tags,SP-SPNL&filter=statuses,active",
            SN8PortSubscriptions.filter(p => p.status === "active")
        );
        fetchMock.get("/api/v2/subscriptions/all", []);
        fetchMock.get("glob:*/api/subscriptions/parent_subscriptions/*", []);
        loadVlanMocks();
        return (
            <UserInputContainer
                formName="SN8 portselect, showing only ports for selected organisation"
                stepUserInput={sn8PortSelectInputStepsSelectedOrganisation}
            />
        );
    });

storiesOf("UserInputFormWizard", module)
    .addDecorator(withKnobs)
    .add("Wizard", () => {
        return (
            <UserInputFormWizard
                validSubmit={forms => {
                    action("submit")(forms);
                    if (forms.length === 1) {
                        return Promise.reject({
                            response: {
                                status: 510,
                                json: () =>
                                    Promise.resolve({
                                        form: [
                                            {
                                                name: "ims_port_id_2",
                                                type: "generic_select",
                                                choices: ["1", "2", "3"]
                                            }
                                        ],
                                        hasNext: false
                                    })
                            }
                        });
                    } else {
                        return Promise.resolve();
                    }
                }}
                stepUserInput={[
                    {
                        name: "ims_port_id_1",
                        type: "generic_select",
                        choices: ["a", "b", "c"]
                    }
                ]}
                hasNext={true}
            />
        );
    });
