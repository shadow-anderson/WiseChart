'use client'

import React, { useState, useEffect } from 'react';
import { Input, Button, Typography, List, Avatar } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Api } from '@web/domain';
import { useAuthentication } from '@web/modules/authentication';

const { Title, Text, Paragraph } = Typography;

export default function PlatformPage() {
  const [insight, setInsight] = useState<string>('');
  const [stockData, setStockData] = useState<any[]>([]);
  const [messages, setMessages] = useState<{ sender: string, text: string }[]>([]);
  const [messageInput, setMessageInput] = useState<string>('');
  const authentication = useAuthentication();

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const data = await Api.StockData.findMany();
        setStockData(data);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();
  }, []);

  const handleSendMessage = () => {
    if (messageInput.trim() === '') {
      return;
    }

    setMessages([...messages, { sender: 'User', text: messageInput }]);
    setMessageInput('');
  };

  return (
    <div>
      <div style={{ marginTop: '2rem' }}>
        <Title level={3}>Stock Chart</Title>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={stockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="closePrice" stroke="#8884d8" />
            <Line type="monotone" dataKey="openPrice" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <Title level={3}>Chat</Title>
        <div style={{ border: '1px solid #d9d9d9', padding: '1rem', borderRadius: '4px' }}>
          <List
            itemLayout="horizontal"
            dataSource={messages}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar>{item.sender[0]}</Avatar>}
                  title={item.sender}
                  description={item.text}
                />
              </List.Item>
            )}
          />
          <Input
            placeholder="Type your message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onPressEnter={handleSendMessage}
          />
          <Button type="primary" onClick={handleSendMessage} style={{ marginTop: '1rem' }}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
