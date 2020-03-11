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

import StoryRouter from "storybook-react-router";
import fetchMock from "fetch-mock";
import ProcessDetail from "../pages/ProcessDetail";

import FAILED_PROCESS_JSON from "./data/process-failed.json";
import SUSPENDED_PROCESS_JSON from "./data/process-suspended.json";

export default {
    title: "ProcessDetail",
    decorators: [StoryRouter()]
};

export const Process = () => {
    fetchMock.restore();
    fetchMock.get("/api/processes/pid", FAILED_PROCESS_JSON);
    fetchMock.get("/api/processes/process-subscriptions-by-pid/1a5686d9-eaa2-4d0b-96eb-1ec081c62a08", []);

    return <ProcessDetail match={{ params: { id: "pid" } }} isProcess={true} />;
};

export const Task = () => {
    fetchMock.restore();
    fetchMock.get("/api/processes/pid", FAILED_PROCESS_JSON);
    fetchMock.get("/api/processes/process-subscriptions-by-pid/1a5686d9-eaa2-4d0b-96eb-1ec081c62a08", []);

    return <ProcessDetail match={{ params: { id: "pid" } }} isProcess={false} />;
};

export const SuspendedProcess = () => {
    fetchMock.restore();
    fetchMock.get("/api/processes/pid", SUSPENDED_PROCESS_JSON);
    fetchMock.get("/api/processes/process-subscriptions-by-pid/cdae2399-dd25-440b-81db-b8846c5fa3ce", []);

    return <ProcessDetail match={{ params: { id: "pid" } }} isProcess={true} />;
};

export const SuspendedTask = () => {
    fetchMock.restore();
    fetchMock.get("/api/processes/pid", SUSPENDED_PROCESS_JSON);
    fetchMock.get("/api/processes/process-subscriptions-by-pid/cdae2399-dd25-440b-81db-b8846c5fa3ce", []);

    return <ProcessDetail match={{ params: { id: "pid" } }} isProcess={false} />;
};