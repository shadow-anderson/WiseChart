'use client'

import { useEffect, useState } from 'react'
import {
  Typography,
  Row,
  Col,
  Card,
  Input,
  Button,
  Select,
  Alert,
  Upload,
  Modal,
  Table,
} from 'antd'
import {
  SearchOutlined,
  BellOutlined,
  SaveOutlined,
  ShareAltOutlined,
  ExportOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
const { Option } = Select
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function HomePage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [indices, setIndices] = useState<Model.Stock[]>([])
  const [selectedIndices, setSelectedIndices] = useState<string[]>([])
  const [indexData, setIndexData] = useState<Model.StockData[]>([])
  const [aiInsights, setAiInsights] = useState<Model.AiInsight[]>([])
  const [userPreferences, setUserPreferences] = useState<
    Model.UserStockPreference[]
  >([])
  const [alerts, setAlerts] = useState<Model.Alert[]>([])
  const [prompt, setPrompt] = useState<string>('')
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [fileList, setFileList] = useState([])

  useEffect(() => {
    if (userId) {
      fetchUserPreferences()
      fetchAlerts()
    }
    fetchIndices()
  }, [userId])

  const fetchUserPreferences = async () => {
    try {
      const preferences = await Api.UserStockPreference.findManyByUserId(
        userId,
        { includes: ['stock'] },
      )
      setUserPreferences(preferences)
    } catch (error) {
      enqueueSnackbar('Failed to fetch user preferences', { variant: 'error' })
    }
  }

  const fetchAlerts = async () => {
    try {
      const userAlerts = await Api.Alert.findManyByUserId(userId, {
        includes: ['stock'],
      })
      setAlerts(userAlerts)
    } catch (error) {
      enqueueSnackbar('Failed to fetch alerts', { variant: 'error' })
    }
  }

  const fetchIndices = async () => {
    try {
      const allIndices = await Api.Stock.findMany({
        includes: ['stockDatas', 'aiInsights'],
        filters: { sector: { eq: 'Index' } },
      })
      setIndices(allIndices)
    } catch (error) {
      enqueueSnackbar('Failed to fetch indices', { variant: 'error' })
    }
  }

  const handleIndexSelection = async (value: string[]) => {
    setSelectedIndices(value)
    const indexDataPromises = value.map(indexId =>
      Api.StockData.findManyByStockId(indexId, { includes: ['stock'] }),
    )
    const indexDataResults = await Promise.all(indexDataPromises)
    setIndexData(indexDataResults.flat())
  }

  const handlePromptSubmit = async () => {
    try {
      const response = await Api.Ai.chat(prompt)
      enqueueSnackbar(response, { variant: 'info' })
    } catch (error) {
      enqueueSnackbar('Failed to process prompt', { variant: 'error' })
    }
  }

  const handleSavePreferences = async () => {
    try {
      const values = {
        userId,
        stockId: selectedIndices[0],
        chartSettings: JSON.stringify(indexData),
      }
      await Api.UserStockPreference.createOneByUserId(userId, values)
      enqueueSnackbar('Preferences saved successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to save preferences', { variant: 'error' })
    }
  }

  const handleSetAlert = async (
    criteria: string,
    notificationMethod: string,
  ) => {
    try {
      const values = {
        userId,
        stockId: selectedIndices[0],
        criteria,
        notificationMethod,
      }
      await Api.Alert.createOneByUserId(userId, values)
      enqueueSnackbar('Alert set successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to set alert', { variant: 'error' })
    }
  }

  const handleUpload = async options => {
    const { file } = options
    const url = await Api.Upload.upload(file)
    setFileList(fileList => [...fileList, { url: url, status: 'done' }])
  }

  const handleExport = () => {
    enqueueSnackbar('Export functionality is not implemented yet', {
      variant: 'info',
    })
  }

  const handleShare = () => {
    enqueueSnackbar('Share functionality is not implemented yet', {
      variant: 'info',
    })
  }

  const handleModalOpen = () => {
    setIsModalVisible(true)
  }

  const handleModalClose = () => {
    setIsModalVisible(false)
  }

  const handleNavigationToPlatform = () => {
    router.push('/platform')
  }

  const handleNavigationToPricing = () => {
    router.push('/pricing')
  }

  const indexColumns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: date => dayjs(date).format('YYYY-MM-DD'),
    },
    { title: 'Open Price', dataIndex: 'openPrice', key: 'openPrice' },
    { title: 'Close Price', dataIndex: 'closePrice', key: 'closePrice' },
    { title: 'High Price', dataIndex: 'highPrice', key: 'highPrice' },
    { title: 'Low Price', dataIndex: 'lowPrice', key: 'lowPrice' },
    { title: 'Volume', dataIndex: 'volume', key: 'volume' },
  ]

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Index Analysis</Title>
      <Paragraph>
        Analyze index performance and get AI-generated insights.
      </Paragraph>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Input
              placeholder="Enter natural language prompt"
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              suffix={<SearchOutlined onClick={handlePromptSubmit} />}
            />
          </Card>
        </Col>

        <Col span={24}>
          <Card>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Select indices"
              onChange={handleIndexSelection}
              value={selectedIndices}
            >
              {indices?.map(index => (
                <Option key={index.id} value={index.id}>
                  {index.name} ({index.symbol})
                </Option>
              ))}
            </Select>
          </Card>
        </Col>

        <Col span={24}>
          <Card>
            <Table columns={indexColumns} dataSource={indexData} rowKey="id" />
          </Card>
        </Col>

        <Col span={24}>
          <Card>
            <Button icon={<SaveOutlined />} onClick={handleSavePreferences}>
              Save Preferences
            </Button>
            <Button
              icon={<BellOutlined />}
              onClick={() => handleSetAlert('price > 100', 'email')}
            >
              Set Alert
            </Button>
            <Button icon={<ExportOutlined />} onClick={handleExport}>
              Export
            </Button>
            <Button icon={<ShareAltOutlined />} onClick={handleShare}>
              Share
            </Button>
            <Button onClick={handleNavigationToPlatform}>
              Go to Platform
            </Button>
            <Button onClick={handleNavigationToPricing}>
              Go to Pricing
            </Button>
          </Card>
        </Col>

        <Col span={24}>
          <Card>
            <Title level={4}>AI Insights</Title>
            {aiInsights?.map(insight => (
              <Alert
                key={insight.id}
                message={insight.insightText}
                type="info"
                showIcon
              />
            ))}
          </Card>
        </Col>

        <Col span={24}>
          <Card>
            <Title level={4}>Educational Resources</Title>
            <Button icon={<InfoCircleOutlined />} onClick={handleModalOpen}>
              View Resources
            </Button>
            <Modal
              title="Educational Resources"
              visible={isModalVisible}
              onCancel={handleModalClose}
              footer={null}
            >
              {/* Educational resources content */}
            </Modal>
          </Card>
        </Col>
      </Row>
    </PageLayout>
  )
}
