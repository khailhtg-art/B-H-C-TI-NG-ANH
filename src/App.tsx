/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Topic from './pages/Topic';
import GameSelection from './pages/GameSelection';
import GameChooseImage from './pages/GameChooseImage';
import GameListenChoose from './pages/GameListenChoose';
import GameMemory from './pages/GameMemory';
import GameMatch from './pages/GameMatch';
import GameSpelling from './pages/GameSpelling';
import ParentDashboard from './pages/ParentDashboard';
import AIChatbot from './pages/AIChatbot';
import Conversations from './pages/Conversations';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="topic/:topicId" element={<Topic />} />
          <Route path="game/:topicId" element={<GameSelection />} />
          <Route path="game/:topicId/choose-image" element={<GameChooseImage />} />
          <Route path="game/:topicId/listen-choose" element={<GameListenChoose />} />
          <Route path="game/:topicId/memory" element={<GameMemory />} />
          <Route path="game/:topicId/match" element={<GameMatch />} />
          <Route path="game/:topicId/spelling" element={<GameSpelling />} />
          <Route path="dashboard" element={<ParentDashboard />} />
          <Route path="chat" element={<AIChatbot />} />
          <Route path="camera" element={<AIChatbot />} />
          <Route path="conversations" element={<Conversations />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
